pragma solidity >=0.7.0 <0.9.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyGov is ERC20 {
    uint256 MyGovSupply;
    uint256 donatedMyGovToken; //initially, change the name of donatedmygovtoken to current supply TODO

    constructor(uint256 tokensupply) ERC20("MyGov", "MG") {
        MyGovSupply = tokensupply; //will not be altered
        donatedMyGovToken = tokensupply; //will be updaetd , current supply (todo)
        _mint(msg.sender, tokensupply); // ???not sure why this contructor is necessary, as we have const supply anyway
    }

    uint256 donatedWei;
    uint256 lockedWei;
    uint256 countMembers; // check for an update on this field whenever a change is possible in myGov for a member
    uint256 surveyCreationFee = 40000000000000000; //in wei
    uint256 submissionFee = 100000000000000000; //in wei

    struct VoteDelegation {
        uint256 votedProposalId;
        address delegatingAddress; //origin of the delgation
    }

    struct User {
        uint256 myGovTokens; // weight is accumulated by delegation
        mapping(uint256 => bool) votedProjectIdsPayment; // if member has delegated vote, this array is filled anyways.
        //The delegated person doesn't store vote it has taken responsibility of in itself.
        mapping(uint256 => bool) votedProjectIdsProposal;
        mapping(uint256 => bool) takenSurveyIds;
        VoteDelegation[] assumedVoteDelegations; //addresses of people of whom member is voting in nomination of. If delegated, one cannot drop mygov to zero ASSUMPTION!
        mapping(uint256 => address) transferredVoteDelegations; // addresses of who the user has delegated to Maped wrt projectid
        uint256 myGovTokensLockedUntil; //maybe a boolean islocked field?
        bool UsedFaucet; //If the user has already got a token from the faucet it is set to true
    }

    struct Survey {
        string Ipfshash;
        address Owner;
        uint256 Deadline;
        uint256 AtmostChoice;
        uint256 SurveyId;
        uint256 NumChoices;
        uint256 NumTaken;
        uint256[] Results;
    }

    struct ProjectProposal {
        uint256[] voteCountForProjectPayment; //array holding vote numbers for each payment
        uint256 voteCountForProjectProposal;
        uint256 totalFundingWei; //assumption project can only be funded with ethers
        uint256 deadline;
        uint256[] paymentAmounts;
        uint256[] paySchedule; //ASSUMPTION IT HOLDS THE PAYMENT (VOTING) DEADLINES FOR EACH INSTALLMENT
        string ipfsHash; // later to be used in writing the frontend
        address owner;
        bool[] allowedToWithdraw;
        bool isStillFunded; // can be set to 0 if withdrawal
    }

    ProjectProposal[] public projectProposals; // the index of a proposal is it's id, // A dynamically-sized array of `Proposal` structs.
    mapping(address => User) public users; // from user address to user itself// This declares a state variable that stores a `Voter` struct for each possible address.
    mapping(address => mapping(address => uint256)) private _tokenAllowances;
    Survey[] public surveys;


    function isMember(User storage user) private view returns (bool) {
        return user.myGovTokens > 0;
    }

    function submitSurvey(
        string calldata ipfshash,
        uint256 surveydeadline,
        uint256 numchoices,
        uint256 atmostchoice
    ) public returns (uint256 surveyid) {
        //todo changed to not payable to check
        User storage owner = users[msg.sender];
        require(isMember(owner), "The user is not a member.");
        require(
            owner.myGovTokens >= 2,
            "Insufficient tokens for survey submission."
        );
        require(
            owner.myGovTokens > 2 ||
                owner.myGovTokensLockedUntil <= block.timestamp,
            "The MyGovs are locked for now."
        );
        //require(msg.value >= surveyCreationFee, "Not enough ethers to submit the proposal.");
        uint256[] memory results = new uint256[](numchoices);

        //only after all the exceptions are cleared, the survey submission starts
        Survey memory mysurvey = Survey({
            Ipfshash: ipfshash,
            Owner: msg.sender,
            Deadline: surveydeadline,
            SurveyId: surveyid,
            AtmostChoice: atmostchoice,
            NumChoices: numchoices,
            NumTaken: 0,
            Results: results // a zeros array
        });

        transferToken(address(this), 2); //2 tokens from the submitter sent to the SC
        address payable to_sc = payable(address(this));

        transfer(to_sc, surveyCreationFee); //stuff below not necessary if this works TODO
        //address payable owneraddress = payable(msg.sender);
        // transfer(owneraddress , msg.value -surveyCreationFee);
        donatedWei += surveyCreationFee;

        surveys.push(mysurvey);
        surveyid = surveys.length - 1; //push returns the new length of the array, so surveyid is the idx of the survey in the surveys arrat
        mysurvey.SurveyId = surveyid;
        return (surveyid);
    } // $ transferfrom - DONE tested wo\ ethers

    function takeSurvey(uint256 surveyid, uint256[] memory choices) public {
        User storage survee = users[msg.sender];
        require(
            isMember(survee),
            "Non members cannot participate in the survey."
        );
        require(
            survee.takenSurveyIds[surveyid] == false,
            "You already participated in the survey"
        );
        require(
            surveys[surveyid].Deadline >= block.timestamp,
            "Deadline exceeded."
        ); // checking if the deadline is here yet.

        //start taking the survey
        for (uint256 i = 0; i < choices.length; i++) {
            surveys[surveyid].Results[choices[i]]++; // adding the member's choices to the results [1,3] 3rd option with idx=2 is chosen
        }
        surveys[surveyid].NumTaken += 1;
        survee.takenSurveyIds[surveyid] = true;
    }

    function getSurveyResults(uint256 surveyid)
        public
        view
        returns (uint256 numtaken, uint256[] memory results)
    {
        numtaken = surveys[surveyid].NumTaken;
        results = surveys[surveyid].Results;
        return (numtaken, results);
    }

    function getSurveyInfo(uint256 surveyid)
        public
        view
        returns (
            string memory ipfshash,
            uint256 surveydeadline,
            uint256 numchoices,
            uint256 atmostchoice
        )
    {
        ipfshash = surveys[surveyid].Ipfshash;
        surveydeadline = surveys[surveyid].Deadline;
        numchoices = surveys[surveyid].NumChoices;
        atmostchoice = surveys[surveyid].AtmostChoice;
        return (ipfshash, surveydeadline, numchoices, atmostchoice);
    }

    function getSurveyOwner(uint256 surveyid)
        public
        view
        returns (address surveyowner)
    {
        return (surveys[surveyid].Owner);
    }

    function getNoOfSurveys() public view returns (uint256 numsurveys) {
        return (surveys.length);
    }

    function faucet() public {
        address spender = msg.sender;
        require(
            (donatedMyGovToken) > 0,
            "No more tokens left in the contract."
        );
        require(
            users[spender].UsedFaucet == false,
            "You already used the faucet."
        );

        this.approveToken(spender, 5); //todp then this one is unnecessary
        transferTokensFrom(address(this), spender, 5); //  msg sender issue //TODO CHANGE IT BACK TO 1,AFTER TESTING SUBMISION
        users[spender].UsedFaucet = true; // todo probably dont need this anymore, but then would have to make the all
    } // $ transfer - DONE

    function reserveProjectGrant(uint256 projectid) public {
        require(getIsProjectFunded(projectid), "Project not funded.");
        require( // can be that proposalToVote != 0 check too. Not sure about this
            (projectProposals.length > projectid) && (projectid >= 0),
            "No such project exists with given id."
        );
        //require (msg.sender == projectProposals[projectid].owner);
        require(
            block.timestamp <= projectProposals[projectid].deadline,
            "The deadline has passed."
        ); //???????????

        uint256 totalfunding = 0;

        for (
            uint256 i = 0;
            i < projectProposals[projectid].paymentAmounts.length;
            i++
        ) {
            totalfunding += projectProposals[projectid].paymentAmounts[i];
        }

        require(
            (donatedWei - lockedWei) >= totalfunding,
            "Not enough ethers to fund the project."
        );
        lockedWei += projectProposals[projectid].totalFundingWei;
        approve(
            projectProposals[projectid].owner,
            projectProposals[projectid].paymentAmounts[0]
        );
    } //The project owner should call this func before the deadline to reserve the grant

    function withdrawProjectPayment(uint256 projectid) public {
        uint256 idx = findSchIndex(projectid);

        require( // can be that proposalToVote != 0 check too. Not sure about this
            (projectProposals.length > projectid) && (projectid >= 0),
            "No such project exists with given id."
        );
        require(msg.sender == projectProposals[projectid].owner); // CRUCIAL !! checking if the person tryingg to withdraw is actually the owner of the project
        require(
            findSchIndex(projectid) !=
                projectProposals[projectid].paySchedule.length
        ); //checking if the index in the boundaries of the payschedule array (more installlments than speciified were attempted)
        require(
            (block.timestamp) >= (projectProposals[projectid].paySchedule[idx])
        ); //Can receive the payment only after the corresponding date in the schedule ASSUMPTION

        uint256 tobelocked = 0;
        ProjectProposal memory p = projectProposals[projectid];

        for (uint256 i = 0; i <= idx; i++) {
            //When the user calls the w,thdraw function they will withdraw all awaiting approved payments
            if (p.allowedToWithdraw[i]) {
                tobelocked += p.paymentAmounts[i];
            }
        }

        lockedWei -= tobelocked;
        donatedWei -= tobelocked;

        address payable owneraddress = payable(msg.sender);

        transferFrom(address(this), owneraddress, tobelocked); //ether is withdrawn
        _spendAllowance(address(this), owneraddress, tobelocked);
    }

    function votingforinstallment(uint256 projectid, bool choice) public {
        uint256 idx = findSchIndex(projectid);
        require( // can be that proposalToVote != 0 check too. Not sure about this
            (projectProposals.length > projectid) && (projectid >= 0),
            "No such project exists with given id."
        );
        //if the vote was delegated for the project proposal, it remains delegated for all the payments.
        User storage voter = users[msg.sender];
        require(
            voter.votedProjectIdsPayment[projectid] != true,
            "User has already voted for this payment."
        );
        require(
            voter.transferredVoteDelegations[projectid] == address(0),
            "User has delegated someone else to vote for the project."
        );
        require(isMember(voter), "User is not a member thus cannot vote.");
        require(idx != projectProposals[projectid].paySchedule.length); //checking if the index in the boundaries of the payschedule array (more installlments than speciified were attempted)

        if (choice) {
            projectProposals[projectid].voteCountForProjectPayment[idx] += 1;
        }
        uint256 yess = projectProposals[projectid].voteCountForProjectPayment[
            idx
        ];

        if (100 * yess > (yess + countMembers)) {
            projectProposals[projectid].allowedToWithdraw[idx] = true;
            this.increaseAllowance(
                projectProposals[projectid].owner,
                projectProposals[projectid].paymentAmounts[idx]
            );
        }
        //else{boolarray[projectProposals[projectid].current_payment_month-1] = false;
    }

    // return which index we are currently at in our paysch array
    function findSchIndex(uint256 projectid) public view returns (uint256 idx) {
        //ASSUMPTION a month is always 30 days
        //uint[] memory payschedule = projectProposals[projectid].paySchedule;
        for (
            uint256 i = 0;
            i < projectProposals[projectid].paySchedule.length;
            i++
        ) {
            if (block.timestamp < projectProposals[projectid].paySchedule[i]) {
                return i;
            }
        }
        return projectProposals[projectid].paySchedule.length;
    }

    function getIsProjectFunded(uint256 projectid)
        public
        view
        returns (bool funded)
    {
        //todo is project still funded or was ever funded???
        require( // can be that proposalToVote != 0 check too. Not sure about this
            (projectProposals.length > projectid) && (projectid >= 0),
            "No such project exists with given id."
        );

        if (projectProposals[projectid].isStillFunded) {
            return true;
        } else {
            return false;
        }
    }

    function getProjectNextPayment(uint256 projectid)
        public
        view
        returns (uint256 next)
    {
        //ASSUMPTION THAT IT RETURNS THE NEXT PAYMENT AMOUNT
        return
            projectProposals[projectid].paymentAmounts[findSchIndex(projectid)]; //ASSUMPTION this month since we assume payment can be withdrawn at the end of the month
    }

    function getProjectOwner(uint256 projectid)
        public
        view
        returns (address projectowner)
    {
        return projectProposals[projectid].owner;
    }

    function getProjectInfo(uint256 projectid)
        public
        view
        returns (
            string memory ipfshash,
            uint256 votedeadline,
            uint256[] memory paymentamounts,
            uint256[] memory payschedule
        )
    {
        ipfshash = projectProposals[projectid].ipfsHash;
        votedeadline = projectProposals[projectid].deadline;
        paymentamounts = projectProposals[projectid].paymentAmounts;
        payschedule = projectProposals[projectid].paySchedule;
        return (ipfshash, votedeadline, paymentamounts, payschedule);
    }

    function delegateVoteTo(address memberaddr, uint256 projectid)
        public
        payable
    {
        //check if the delegating person has right to vote ASSUMPTION self delegation is disabled
        address to = memberaddr;
        address from = msg.sender; //if the caller of function isn't a member the method will be reverted
        require(isMember(users[to]), "Delegation can only be done to members.");
        require(
            isMember(users[from]),
            "Non-members don't have the right to vote thus no right to delegate."
        );
        require(from != to, "Self-delegation is not possible.");
        require(
            users[from].transferredVoteDelegations[projectid] == address(0),
            "The delegation has already happened."
        );

        users[to].assumedVoteDelegations.push(
            VoteDelegation({
                votedProposalId: projectid,
                delegatingAddress: from
            })
        );

        users[from].transferredVoteDelegations[projectid] = to;
    }

    function donateEther() public payable {
        //see if we need to check message sender's balance compared to the eth amount it wants to send, --------------------- BUT HOW ABOUT THE DONORS BALANCE'S DECREASE????--------------
        //transferFrom(msg.sender,address(this), msg.value);
        address payable sc = payable(address(this));
        transfer(sc, msg.value);
        donatedWei += msg.value;
    }

    function donateMyGovToken(uint256 amount) public {
        require(
            users[msg.sender].myGovTokens >= amount,
            "Insufficient MyGovTokens balance for entered donation amount."
        );

        require(
            (users[msg.sender].myGovTokens > amount ||
                (users[msg.sender].myGovTokensLockedUntil <= block.timestamp)),
            "User cannot drop it's member status during voting."
        );

        transferToken(address(this), amount);
    } // $ transferfrom done

    //when a voter is voting, it also uses the votes it has been delegated at exactly that moment
    //ASSUMPTION: a prject name cant be zero (or whatever the default value is)
    function voteForProjectProposal(uint256 projectid, bool choice) public {
        //ProjectProposal memory proposalToVote = projectProposals[projectid];
        require( // can be that proposalToVote != 0 check too. Not sure about this
            (projectProposals.length > projectid) && (projectid >= 0),
            "No such project exists with given id."
        );

        User storage voter = users[msg.sender]; // todo change to users[]
        require(
            voter.votedProjectIdsProposal[projectid] != true,
            "User has already voted"
        );
        require(
            voter.transferredVoteDelegations[projectid] == address(0),
            "User has delegated someone else to vote for the project."
        );
        require(isMember(voter), "User is not a member thus cannot vote.");

        //first vote for own
        voter.votedProjectIdsProposal[projectid] = true;
        if (choice) {
            projectProposals[projectid].voteCountForProjectProposal++;
        }
        if (
            voter.myGovTokensLockedUntil < projectProposals[projectid].deadline
        ) {
            voter.myGovTokensLockedUntil = projectProposals[projectid].deadline;
        }

        //then vote for the delegators TODO ERROR, did not increase vote numbers
        for (uint256 i = 0; i < voter.assumedVoteDelegations.length; i++) {
            VoteDelegation memory voteDelegation = voter.assumedVoteDelegations[
                i
            ];
            if ((voteDelegation.votedProposalId == projectid)) {
                // todo , change storage
                User storage delegated = users[
                    voteDelegation.delegatingAddress
                ];
                if (!delegated.votedProjectIdsProposal[projectid]) {
                    delegated.votedProjectIdsProposal[projectid] = true;
                    if (
                        delegated.myGovTokensLockedUntil <
                        projectProposals[projectid].deadline
                    ) {
                        delegated.myGovTokensLockedUntil = projectProposals[
                            projectid
                        ].deadline;
                    }
                    if (choice) {
                        projectProposals[projectid]
                            .voteCountForProjectProposal++;
                    }
                }
            }
        }

        if (
            countMembers <=
            10 * (projectProposals[projectid].voteCountForProjectProposal)
        ) {
            projectProposals[projectid].isStillFunded = true;
        } else {
            projectProposals[projectid].isStillFunded = false;
        }
    }

    function submitProjectProposal(
        string memory ipfshash,
        uint256 votedeadline,
        uint256[] memory paymentamounts,
        uint256[] memory payschedule
    ) public payable returns (uint256 projectid) {
        console.log("Inside");
        require(
            isMember(users[msg.sender]),
            "Non-members cannot call this function."
        );

        uint256[] memory votecountsforpayment = new uint256[](
            paymentamounts.length
        );

        transferToken(address(this), 5);
        address payable to_sc = payable(address(this));
        transfer(to_sc, submissionFee); //if this works, dont uncomment below, TODO
        donatedWei += submissionFee;

        projectid = projectProposals.length;

        ProjectProposal memory p = ProjectProposal({
            voteCountForProjectPayment: votecountsforpayment, //new uint[](paymentamounts.length),
            voteCountForProjectProposal: 0,
            totalFundingWei: 0,
            deadline: votedeadline,
            paymentAmounts: paymentamounts,
            paySchedule: payschedule,
            ipfsHash: ipfshash,
            owner: msg.sender,
            allowedToWithdraw: new bool[](paymentamounts.length), // another way to initialize whole array to false PAT KUT CAT
            isStillFunded: false
        });

        projectProposals.push(p); //project submitted
        return projectid;
    } // $ transferfrom - DONE - tested wo ethers

    function getNoOfProjectProposals()
        public
        view
        returns (uint256 numproposals)
    {
        return projectProposals.length;
    }

    function getNoOfFundedProjects() public view returns (uint256 numfunded) {
        uint256 count = 0;
        for (uint256 i = 0; i < projectProposals.length; i++) {
            if (getIsProjectFunded(i)) {
                count++;
            }
        }
        return count;
    }

    function getEtherReceivedByProject(uint256 projectid)
        public
        view
        returns (uint256 amount)
    {
        require(
            projectProposals.length > projectid,
            "No project proposal with given id exists."
        );
        return projectProposals[projectid].totalFundingWei;
    }

    //function updateLockedFund() public   TODO

    //----------------------------IMPLEMENTATION OF STD ERC FUNCS

    function _transferToken(
        address from,
        address to,
        uint256 amount
    ) internal {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");

        if (from == address(this)) {
            require(
                donatedMyGovToken >= amount,
                "Contract has Insufficient MyGovTokens balance for the transaction."
            );
            donatedMyGovToken -= amount;
        } else {
            //payment coming from another address
            require(
                users[from].myGovTokens >= amount,
                "Insufficient MyGovTokens balance for the transaction."
            );

            if ((users[from].myGovTokens == amount)) {
                require(
                    users[from].myGovTokensLockedUntil <= block.timestamp,
                    "The token balance is locked due to ongoing voting."
                );
                countMembers--;
            }

            users[from].myGovTokens -= amount;
        }

        if (to == address(this)) {
            donatedMyGovToken += amount;
        } else {
            if (users[to].myGovTokens == 0) {
                countMembers++;
            }
            users[to].myGovTokens += amount;
        }
    }

    function transferToken(address to, uint256 amount) public returns (bool) {
        address from = msg.sender;
        _transferToken(from, to, amount);
        return true;
    }

    function transferTokensFrom(
        address from,
        address to,
        uint256 amount
    ) public virtual returns (bool) {
        //For inst

        require(
            amount <= allowanceToken(from, to),
            "Not enough token allowance."
        );
        _transferToken(from, to, amount);
        _spendTokenAllowance(from, to, amount);

        return true;
    }

    function allowanceToken(address owner, address spender)
        public
        view
        returns (uint256)
    {
        return _tokenAllowances[owner][spender]; //returns how many MGs does the smart contract allows a user to withdraw
    }

    function _approveToken(
        address owner,
        address spender,
        uint256 amount
    ) public returns (bool) {
        require(
            owner != address(0),
            "ERC20 MyGov: approve from the zero address"
        );
        require(
            spender != address(0),
            "ERC20 MyGov: approve to the zero address"
        );

        _tokenAllowances[owner][spender] = amount;

        return true;
    }

    function approveToken(address spender, uint256 amount)
        public
        returns (bool)
    {
        address owner = msg.sender;
        _approveToken(owner, spender, amount);
        return true;
    }

    //todo ıs buy and sell necessary
    /*function buy_MyGovToken(uint amount) public returns(bool){
        //BUT WHAT IS THE EXCHANGE RATE TODO 
        //https://stackoverflow.com/questions/67409550/implementing-buying-and-selling-in-solidity , CODE AVAİLABLE HERE    
    }*/

    function _spendTokenAllowance(
        address owner,
        address spender,
        uint256 amount
    ) internal {
        uint256 currentAllowance = allowanceToken(owner, spender);
        if (currentAllowance != type(uint256).max) {
            require(currentAllowance >= amount, "insufficient allowance");
            unchecked {
                _approveToken(owner, spender, currentAllowance - amount);
            }
        }
    }

    function totalTokenSupply() public view returns (uint256) {
        return MyGovSupply;
    }

    function tokenBalanceOf(address account)
        public
        view
        returns (uint256 rvalue)
    {
        return users[account].myGovTokens;
    }
}
