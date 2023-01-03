pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyGov is ERC20 { 
    
	uint MyGovSupply;
    uint currentMyGovSupply; //initially, change the name of currentMyGovSupply to current supply TODO
	
	constructor(uint tokensupply) ERC20("MyGov", "MG") {
        MyGovSupply = tokensupply; //MyGovSupply will never be altered = constant supply. 
        currentMyGovSupply = tokensupply; 
        _mint(address(this) ,tokensupply);
		//_mint(msg.sender, tokensupply); 
	}

	uint donatedWei;
	uint lockedWei; 
	uint countMembers; // check for an update on this field whenever a change is possible in myGov for a member
    uint surveyCreationFee =  40000000000000000; //in wei
    uint tokenFee =     5; // ERC TOKEN / not in wei
    

		struct VoteDelegation{ 
			uint votedProposalId;
            address delegatingAddress;//origin of the delgation
		}
			
        struct 	User {
            uint myGovTokens; // weight is accumulated by delegation
            mapping	(uint =>	bool) votedProjectIdsPayment;  // if member has delegated vote, this array is filled anyways. 
            //The delegated person doesn't store vote it has taken responsibility of in itself.
            mapping	(uint =>	bool) votedProjectIdsProposal;
            mapping	(uint =>	bool) takenSurveyIds;
            VoteDelegation[] assumedVoteDelegations ;  //addresses of people of whom member is voting in nomination of. If delegated, one cannot drop mygov to zero ASSUMPTION!
            mapping	(uint => address) transferredVoteDelegations; // addresses of who the user has delegated to Mapped wrt projectid
            uint myGovTokensLockedUntil; //maybe a boolean islocked field?
			bool UsedFaucet ; //If the user has already got a token from the faucet it is set to true
        }

		struct Survey{
            string Ipfshash; 
            address Owner; 
            uint Deadline; 
            uint AtmostChoice; 
            uint SurveyId;
            uint NumChoices;
            uint NumTaken;
            uint [] Results;	
        }
		
		struct ProjectProposal {
			uint [] voteCountForProjectPayment; //array holding vote numbers for each payment
			uint voteCountForProjectProposal;
			uint totalFundingWei; //assumption project can only be funded with ethers
			uint deadline;
			uint [] paymentAmounts;
			uint [] paySchedule; //ASSUMPTION IT HOLDS THE PAYMENT (VOTING) DEADLINES FOR EACH INSTALLMENT 
			string ipfsHash; // later to be used in writing the frontend
			address owner;
			bool [] allowedToWithdraw;
            bool isStillFunded; // can be set to 0 if withdrawal
		}
    
    ProjectProposal[] public projectProposals; // the index of a proposal is it's id, // A dynamically-sized array of `Proposal` structs.
    mapping(address => User) public users; // from user address to user itself// This declares a state variable that stores a `Voter` struct for each possible address.
    mapping(address => mapping(address => uint256)) private _tokenAllowances;
    Survey[] public surveys;

    function isMember(address useraddress) public view returns(bool){
        return balanceOf(useraddress)>0;
        //return users[useraddress].myGovTokens > 0; todo old version
    }

    function submitSurvey(string memory ipfshash,uint surveydeadline,uint numchoices, uint atmostchoice) public payable returns (uint surveyid) {
        //todo changed to not payable to check
		
		require(isMember(msg.sender), "1");
        require(users[msg.sender].myGovTokens >=2, "1");
		require(users[msg.sender].myGovTokens >2  || users[msg.sender].myGovTokensLockedUntil <= block.timestamp, "3"); 
        require(msg.value >= surveyCreationFee, "Not enough ethers to submit the survey.");
		uint[] memory results = new uint[](numchoices) ; 

		//only after all the exceptions are cleared, the survey submission starts
		Survey memory mysurvey = Survey({
                    Ipfshash : ipfshash,
                    Owner: msg.sender,
                    Deadline: surveydeadline,
            		SurveyId: surveyid,
                    AtmostChoice: atmostchoice,
                    NumChoices: numchoices,
                    NumTaken : 0,
                    Results : results // a zeros array
        });
        

        transfer(address(this), 2); //2 tokens from the submitter sent to the SC 
        //address payable to_sc = payable(address(this));
        
        // to do pay the excess back
         //stuff below not necessary if this works TODO
        //address payable owneraddress = payable(msg.sender);
       // transfer(owneraddress , msg.value -surveyCreationFee);
        donatedWei += surveyCreationFee; 
       
        surveys.push(mysurvey);
        surveyid = surveys.length - 1 ; //push returns the new length of the array, so surveyid is the idx of the survey in the surveys arrat
		mysurvey.SurveyId = surveyid;
        //(bool sent , bytes memory data) = msg.sender.call{value: msg.value - surveyCreationFee}(""); 
        //require(sent, "failed to refund");
        
        return (surveyid);
	}       // $ transferfrom - DONE tested wo\ ethers

    function takeSurvey(uint surveyid,uint [] memory choices) public {
        User storage survee = users[msg.sender];
        require(isMember(msg.sender),"Non members cannot participate in the survey.");
        require(survee.takenSurveyIds[surveyid] == false, "You already participated in the survey");
        require (surveys[surveyid].Deadline >= block.timestamp, "Deadline exceeded."); // checking if the deadline is here yet.
        
        //start taking the survey
        for(uint i=0; i < choices.length; i++){
            surveys[surveyid].Results[choices[i]] ++ ; // adding the member's choices to the results [1,3] 3rd option with idx=2 is chosen
        } 
        surveys[surveyid].NumTaken += 1; 
        survee.takenSurveyIds[surveyid] = true;
    }

	function getSurveyResults(uint surveyid) public view returns(uint numtaken, uint [] memory results) {
		numtaken = surveys[surveyid].NumTaken;
		results  = surveys[surveyid].Results;
		return (numtaken, results);
	}

	function getSurveyInfo(uint surveyid) public view returns(string memory ipfshash,uint surveydeadline,uint numchoices, uint atmostchoice) {
		ipfshash = surveys[surveyid].Ipfshash;
		surveydeadline = surveys[surveyid].Deadline;
		numchoices = surveys[surveyid].NumChoices;
		atmostchoice = surveys[surveyid].AtmostChoice;
		return( ipfshash, surveydeadline, numchoices, atmostchoice);
	}

	function getSurveyOwner(uint surveyid) public view returns(address surveyowner){
		return (surveys[surveyid].Owner);
	}

	function getNoOfSurveys() public view returns(uint numsurveys){
		return (surveys.length);
	}

	function faucet() public {

        address spender = msg.sender;
		require ( (currentMyGovSupply) > 0,"No more tokens left in the contract.");
		require(users[spender].UsedFaucet == false, "You already used the faucet.");
    
        this.transfer(spender, 5); //  msg sender issue //TODO CHANGE IT BACK TO 1,AFTER TESTING SUBMISION
        users[spender].UsedFaucet = true; // todo probably dont need this anymore, but then would have to make the all
        users[spender].myGovTokens +=5;
	}       // $ transfer - DONE
		
    function reserveProjectGrant(uint projectid) public{

		require(getIsProjectFunded(projectid),"Project not funded.");
		require( // can be that proposalToVote != 0 check too. Not sure about this
            (projectProposals.length > projectid) && (projectid >= 0) ,
            "No such project exists with given id.");
		//require (msg.sender == projectProposals[projectid].owner);
		require(true, "The deadline has passed."); //???????????
		
		uint totalfunding =0;
		
		for(uint i=0;i < projectProposals[projectid].paymentAmounts.length;i++){
			totalfunding += projectProposals[projectid].paymentAmounts[i];
			}
		
		require(true, "Not enough ethers to fund the project.");
		lockedWei += projectProposals[projectid].totalFundingWei;
		approve(projectProposals[projectid].owner, projectProposals[projectid].paymentAmounts[0]); 
    } //The project owner should call this func before the deadline to reserve the grant

    function withdrawProjectPayment(uint projectid) public {
        uint idx = findSchIndex(projectid)-1;

		require( // can be that proposalToVote != 0 check too. Not sure about this
            (projectProposals.length > projectid) && (projectid >= 0) ,
            "No such project exists with given id.");
		require (msg.sender == projectProposals[projectid].owner); // CRUCIAL !! checking if the person tryingg to withdraw is actually the owner of the project
		require(findSchIndex(projectid) <= projectProposals[projectid].paySchedule.length); //checking if the index in the boundaries of the payschedule array (more installlments than speciified were attempted)
        projectProposals[projectid].paySchedule[idx];
        require(true); //Can receive the payment only after the corresponding date in the schedule ASSUMPTION

		uint tobelocked = 0 ;
		ProjectProposal memory p = projectProposals[projectid]; 
		
		for(uint i=0;i <= idx; i++){ //When the user calls the w,thdraw function they will withdraw all awaiting approved payments 
			if(p.allowedToWithdraw[i]){
				tobelocked += p.paymentAmounts[i];
			}
		}
		
		lockedWei -= tobelocked;
		donatedWei -= tobelocked;

		address payable owneraddress = payable(msg.sender);

        transferFrom(address(this), owneraddress , tobelocked); //ether is withdrawn
        _spendAllowance(address(this), owneraddress , tobelocked);
        

    }        

    function votingforinstallment(uint projectid, bool choice) public{
        uint idx = findSchIndex(projectid);
		require( // can be that proposalToVote != 0 check too. Not sure about this
            (projectProposals.length > projectid) && (projectid >= 0) ,
            "No such project exists with given id."
        );
		//if the vote was delegated for the project proposal, it remains delegated for all the payments.
        User storage voter = users[msg.sender];
        require(voter.votedProjectIdsPayment[projectid] != true,"User has already voted for this payment.");
        require(voter.transferredVoteDelegations[projectid] == address(0),"User has delegated someone else to vote for the project.");
        require(isMember(msg.sender), "User is not a member thus cannot vote.");	
		require(true); //checking if the index in the boundaries of the payschedule array (more installlments than speciified were attempted)
	   
		if (choice){
			projectProposals[projectid].voteCountForProjectPayment[idx] += 1 ;
		}
		uint yess = projectProposals[projectid].voteCountForProjectPayment[idx];
		
		if (100*yess > (yess + countMembers)){
			 projectProposals[projectid].allowedToWithdraw[idx] = true;
             this.increaseAllowance(projectProposals[projectid].owner, projectProposals[projectid].paymentAmounts[idx]);
		}
		//else{boolarray[projectProposals[projectid].current_payment_month-1] = false;
		
	} 
		
	// return which index we are currently at in our paysch array
    function findSchIndex(uint projectid) public view returns (uint idx){//ASSUMPTION a month is always 30 days 
        //uint[] memory payschedule = projectProposals[projectid].paySchedule;
        for(uint i = 0; i < projectProposals[projectid].paySchedule.length; i++){ 
            if(block.timestamp < projectProposals[projectid].paySchedule[i]){
                return i;
            }
        }
        return  projectProposals[projectid].paySchedule.length;
    }

    function getIsProjectFunded(uint projectid) public view returns(bool funded){ //todo is project still funded or was ever funded???
		require( // can be that proposalToVote != 0 check too. Not sure about this
            (projectProposals.length > projectid) && (projectid >= 0) ,
            "No such project exists with given id.");	

		if(projectProposals[projectid].isStillFunded){
			return true;}
		else{
			return true;}
    }

    function getProjectNextPayment(uint projectid) public view returns(uint next){ //ASSUMPTION THAT IT RETURNS THE NEXT PAYMENT AMOUNT
        uint pro = findSchIndex(projectid);
		return projectProposals[projectid].paymentAmounts[pro];//ASSUMPTION this month since we assume payment can be withdrawn at the end of the month
    }

    function getProjectOwner(uint projectid) public view returns(address projectowner){
		return projectProposals[projectid].owner;
    }

    function getProjectInfo(uint projectid) public view returns(string memory ipfshash, uint votedeadline,uint [] memory paymentamounts, uint [] memory payschedule){
		ipfshash = projectProposals[projectid].ipfsHash;
		votedeadline = projectProposals[projectid].deadline;
		paymentamounts = projectProposals[projectid].paymentAmounts;
		payschedule = projectProposals[projectid].paySchedule;
		return (ipfshash,votedeadline,paymentamounts,payschedule);
    }

    function delegateVoteTo(address memberaddr, uint projectid) public payable{
        //check if the delegating person has right to vote ASSUMPTION self delegation is disabled
        address to = memberaddr;
        address from = msg.sender; //if the caller of function isn't a member the method will be reverted
        require(isMember(to),"Delegation can only be done to members.");
        require(isMember(from),"Non-members don't have the right to vote thus no right to delegate.");
        require(from != to,"Self-delegation is not possible.");
        require(users[from].transferredVoteDelegations[projectid] == address(0),"The delegation has already happened.");

        users[to].assumedVoteDelegations.push(VoteDelegation({
                votedProposalId: projectid,
                delegatingAddress: from
            }));

        users[from].transferredVoteDelegations[projectid] = to;
    }
 
    function donateEther() public payable{
        //see if we need to check message sender's balance compared to the eth amount it wants to send, --------------------- BUT HOW ABOUT THE DONORS BALANCE'S DECREASE????--------------
        //transferFrom(msg.sender,address(this), msg.value);
        //address payable sc = payable(address(this));

        //transfer(sc, msg.value);
        donatedWei += msg.value ;
    }

    receive() external payable{
        donatedWei += msg.value ;
    }


    function donateMyGovToken(uint amount) public {
        require(
            users[msg.sender].myGovTokens >= amount,
            "Insufficient MyGovTokens balance for entered donation amount."
        );

        require(
            ( users[msg.sender].myGovTokens > amount || (users[msg.sender].myGovTokensLockedUntil <= block.timestamp)),
            "User cannot drop it's member status during voting."
        );

        users[msg.sender].myGovTokens -=amount; //todo  switch all .mygovtokens to balanceof 
        transfer(address(this), amount);

  
    } // $ transferfrom done

    //when a voter is voting, it also uses the votes it has been delegated at exactly that moment
    //ASSUMPTION: a prject name cant be zero (or whatever the default value is)
    function voteForProjectProposal(uint projectid,bool choice) public {
      //ProjectProposal memory proposalToVote = projectProposals[projectid];
        require( // can be that proposalToVote != 0 check too. Not sure about this
            (projectProposals.length > projectid) && (projectid >= 0) ,
            "No such project exists with given id.");

        User storage voter = users[msg.sender]; // todo change to users[]
        require(voter.votedProjectIdsProposal[projectid] != true,"User has already voted");
        require(voter.transferredVoteDelegations[projectid] == address(0),"User has delegated someone else to vote for the project.");
        require(isMember(msg.sender), "User is not a member thus cannot vote.");
        
       
        //first vote for own
        voter.votedProjectIdsProposal[projectid] = true;
        if(choice){
            projectProposals[projectid].voteCountForProjectProposal++;
        }
        if(voter.myGovTokensLockedUntil < projectProposals[projectid].deadline){
            voter.myGovTokensLockedUntil = projectProposals[projectid].deadline;
        }

        //then vote for the delegators TODO ERROR, did not increase vote numbers 
        for(uint i = 0; i < voter.assumedVoteDelegations.length; i++){
            VoteDelegation memory voteDelegation = voter.assumedVoteDelegations[i];
            if((voteDelegation.votedProposalId == projectid)){  // todo , change storage
                User storage delegated = users[voteDelegation.delegatingAddress];
                if(!delegated.votedProjectIdsProposal[projectid]){
                    delegated.votedProjectIdsProposal[projectid] = true;
                    if(delegated.myGovTokensLockedUntil < projectProposals[projectid].deadline){
                        delegated.myGovTokensLockedUntil = projectProposals[projectid].deadline;
                    }
                    if(choice){
                        projectProposals[projectid].voteCountForProjectProposal++;
                    }
                }
            }
        }

        if(countMembers <= 10*(projectProposals[projectid].voteCountForProjectProposal)){
            projectProposals[projectid].isStillFunded = true;
		}
		else{
            projectProposals[projectid].isStillFunded = false;
		}
    }
    
    function submitProjectProposal(string memory ipfshash, uint votedeadline, uint [] memory paymentamounts, uint [] memory payschedule) public payable returns (uint projectid) {
        require(isMember(msg.sender), "Non-members cannot call this function.");
			
		uint[] memory votecountsforpayment = new uint[](paymentamounts.length); 

			
        transfer(address(this),tokenFee);
        //address payable to_sc = payable(address(this));
        //transfer(to_sc, tokenFee ); //if this works, dont uncomment below, TODO
        donatedWei += tokenFee;

        projectid = projectProposals.length;
            
        ProjectProposal memory p = ProjectProposal({
            voteCountForProjectPayment: votecountsforpayment,//new uint[](paymentamounts.length),
            voteCountForProjectProposal: 0,
            totalFundingWei: 0,
            deadline: votedeadline,
            paymentAmounts: paymentamounts,
            paySchedule: payschedule,
            ipfsHash: ipfshash,
            owner: msg.sender,
			allowedToWithdraw: new bool[](paymentamounts.length), // another way to initialize whole array to false PAT KUT CAT
            isStillFunded : false
        });

        projectProposals.push(p); //project submitted	
        return projectid;
    }   // $ transferfrom - DONE - tested wo ethers

    function getNoOfProjectProposals() public view returns(uint numproposals){
        return projectProposals.length;
    }

    function getNoOfFundedProjects () public view returns(uint numfunded){
        uint count = 0;
        for(uint i = 0; i < projectProposals.length; i++){
            if(getIsProjectFunded(i)){
                count++;
            }
        }
        return count;
    }

    function getEtherReceivedByProject (uint projectid) public view returns(uint amount){
        require(
            projectProposals.length > projectid,
            "No project proposal with given id exists."
        );
        return projectProposals[projectid].totalFundingWei;
         
    }

    function mint(address to,uint amount) public {
        _mint(to, amount);
    }
}