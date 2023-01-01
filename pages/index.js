import Head from "next/head";
import { useState, useEffect } from "react";
import { useWallet } from "../hooks/useWallet";

export default function Home() {
  const { account, balance, contract, connectWallet } = useWallet();
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");

  // PARAMETERS FUNCTIONS
  const [ipfshash, setIpfshash] = useState("");
  const [surveydeadline, setSurveydeadline] = useState("");
  const [numchoices, setNumchoices] = useState("");
  const [atmostchoice, setAtmostchoice] = useState("");
  const [surveyid, setSurveyid] = useState("");
  const [choices, setChoices] = useState("");
  const [projectid, setProjectid] = useState("");
  const [choice, setChoice] = useState("");
  const [memberaddr, setMemberaddr] = useState("");
  const [amount, setAmount] = useState("");
  const [votedeadline, setVotedeadline] = useState("");
  const [paymentamounts, setPaymentamounts] = useState("");
  const [payschedule, setPayschedule] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [owner, setOwner] = useState("");
  const [spender, setSpender] = useState("");
  const [account_, setAccount] = useState("");

  // --------------------------------
  // STATE_LIST OF RETURN VALUES
  const [submitSurvey, set_submitSurvey] = useState(null);
  const [takeSurvey, set_takeSurvey] = useState(null);
  const [getSurveyResults, set_getSurveyResults] = useState(null);
  const [getSurveyInfo, set_getSurveyInfo] = useState(null);
  const [getSurveyOwner, set_getSurveyOwner] = useState(null);
  const [getNoOfSurveys, set_getNoOfSurveys] = useState(null);
  const [faucet, set_faucet] = useState(null);
  const [reserveProjectGrant, set_reserveProjectGrant] = useState(null);
  const [withdrawProjectPayment, set_withdrawProjectPayment] = useState(null);
  const [votingforinstallment, set_votingforinstallment] = useState(null);
  const [findSchIndex, set_findSchIndex] = useState(null);
  const [getIsProjectFunded, set_getIsProjectFunded] = useState(null);
  const [getProjectNextPayment, set_getProjectNextPayment] = useState(null);
  const [getProjectOwner, set_getProjectOwner] = useState(null);
  const [getProjectInfo, set_getProjectInfo] = useState(null);
  const [delegateVoteTo, set_delegateVoteTo] = useState(null);
  const [donateEther, set_donateEther] = useState(null);
  const [donateMyGovToken, set_donateMyGovToken] = useState(null);
  const [voteForProjectProposal, set_voteForProjectProposal] = useState(null);
  const [submitProjectProposal, set_submitProjectProposal] = useState(null);
  const [getNoOfProjectProposals, set_getNoOfProjectProposals] = useState(null);
  const [getNoOfFundedProjects, set_getNoOfFundedProjects] = useState(null);
  const [getEtherReceivedByProject, set_getEtherReceivedByProject] =
    useState(null);
  const [transferToken, set_transferToken] = useState(null);
  const [transferTokensFrom, set_transferTokensFrom] = useState(null);
  useState(null);
  const [allowanceToken, set_allowanceToken] = useState(null);
  const [approveToken, set_approveToken] = useState(null);
  const [totalTokenSupply, set_totalTokenSupply] = useState(null);
  const [tokenBalanceOf, set_tokenBalanceOf] = useState(null);
  // HANDLE_LIST OF BUTTONS=> These functions are called when the buttons are clicked.
  const handle_submitSurvey = () => {
    contract
      .submitSurvey(ipfshash, surveydeadline, numchoices, atmostchoice)
      .then((resp) => {
        set_submitSurvey(resp);
        console.log(resp);
      });
  };
  const handle_takeSurvey = () => {
    //Object.entries(choices) converts the object to an array.
    contract
      .takeSurvey(surveyid, Object.entries(choices))
      .then((resp) => set_takeSurvey(resp));
  };
  const handle_getSurveyResults = () => {
    contract
      .getSurveyResults(surveyid)
      .then((resp) => set_getSurveyResults(resp));
  };
  const handle_getSurveyInfo = () => {
    contract.getSurveyInfo(surveyid).then((resp) => set_getSurveyInfo(resp));
  };
  const handle_getSurveyOwner = () => {
    contract.getSurveyOwner(surveyid).then((resp) => set_getSurveyOwner(resp));
  };
  const handle_getNoOfSurveys = () => {
    contract.getNoOfSurveys().then((resp) => {
      set_getNoOfSurveys(resp);
      console.log(resp);
    });
  };
  const handle_faucet = () => {
    contract.faucet().then((resp) => {
      set_faucet(resp);
      console.log(resp);
    });
  };
  const handle_reserveProjectGrant = () => {
    contract.reserveProjectGrant(projectid).then((resp) => {
      set_reserveProjectGrant(resp);
      console.log(resp);
    });
  };
  const handle_withdrawProjectPayment = () => {
    contract.withdrawProjectPayment(projectid).then((resp) => {
      set_withdrawProjectPayment(resp);
      console.log(resp);
    });
  };
  const handle_votingforinstallment = () => {
    contract.votingforinstallment(projectid, choice).then((resp) => {
      set_votingforinstallment(resp);
      console.log(resp);
    });
  };
  const handle_findSchIndex = () => {
    contract.findSchIndex(projectid).then((resp) => {
      set_findSchIndex(resp);
      console.log(resp);
    });
  };
  const handle_getIsProjectFunded = () => {
    contract.getIsProjectFunded(projectid).then((resp) => {
      set_getIsProjectFunded(resp);
      console.log(resp);
    });
  };
  const handle_getProjectNextPayment = () => {
    contract.getProjectNextPayment(projectid).then((resp) => {
      set_getProjectNextPayment(resp);
      console.log(resp);
    });
  };
  const handle_getProjectOwner = () => {
    contract.getProjectOwner(projectid).then((resp) => {
      set_getProjectOwner(resp);
      console.log(resp);
    });
  };
  const handle_getProjectInfo = () => {
    contract.getProjectInfo(projectid).then((resp) => {
      set_getProjectInfo(resp);
      console.log(resp);
    });
  };
  const handle_delegateVoteTo = () => {
    contract.delegateVoteTo(memberaddr, projectid).then((resp) => {
      set_delegateVoteTo(resp);
      console.log(resp);
    });
  };
  const handle_donateEther = () => {
    contract.donateEther().then((resp) => {
      set_donateEther(resp);
      console.log(resp);
    });
  };
  const handle_donateMyGovToken = () => {
    contract.donateMyGovToken(amount).then((resp) => {
      set_donateMyGovToken(resp);
      console.log(resp);
    });
  };
  const handle_voteForProjectProposal = () => {
    contract.voteForProjectProposal(projectid, choice).then((resp) => {
      set_voteForProjectProposal(resp);
      console.log(resp);
    });
  };
  const handle_submitProjectProposal = () => {
    contract
      .submitProjectProposal(
        ipfshash,
        votedeadline,
        paymentamounts,
        payschedule
      )
      .then((resp) => set_submitProjectProposal(resp));
  };
  const handle_getNoOfProjectProposals = () => {
    contract.getNoOfProjectProposals().then((resp) => {
      set_getNoOfProjectProposals(resp);
      console.log(resp);
    });
  };
  const handle_getNoOfFundedProjects = () => {
    contract.getNoOfFundedProjects().then((resp) => {
      set_getNoOfFundedProjects(resp);
      console.log(resp);
    });
  };
  const handle_getEtherReceivedByProject = () => {
    contract.getEtherReceivedByProject(projectid).then((resp) => {
      set_getEtherReceivedByProject(resp);
      console.log(resp);
    });
  };
  const handle_transferToken = () => {
    contract.transferToken(to, amount).then((resp) => {
      set_transferToken(resp);
      console.log(resp);
    });
  };
  const handle_transferTokensFrom = () => {
    contract.transferTokensFrom(from, to, amount).then((resp) => {
      set_transferTokensFrom(resp);
      console.log(resp);
    });
  };
  const handle_allowanceToken = () => {
    contract.allowanceToken(owner, spender).then((resp) => {
      set_allowanceToken(resp);
      console.log(resp);
    });
  };
  const handle_approveToken = () => {
    contract.approveToken(spender, amount).then((resp) => {
      set_approveToken(resp);
      console.log(resp);
    });
  };
  const handle_totalTokenSupply = () => {
    contract.totalTokenSupply().then((resp) => {
      set_totalTokenSupply(resp);
      console.log(resp);
    });
  };
  const handle_tokenBalanceOf = () => {
    contract.tokenBalanceOf(account_).then((resp) => {
      set_tokenBalanceOf(resp);
      console.log(resp);
    });
  };
  const getUser = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("Please input userId");
      return;
    }
    contract
      .users(userId)
      .then((resp) => {
        setUsers(resp);
        console.log(resp);
      })
      .catch((error) => alert(error));
  };

  const handleChangeInput = (e) => {
    setUserId(e.target.value);
  };

  // HANDLE_LIST OF INPUTS
  const handle_pm_ipfshash = (e) => {
    setIpfshash(e.target.value);
  };
  const handle_pm_surveydeadline = (e) => {
    setSurveydeadline(e.target.value);
  };
  const handle_pm_numchoices = (e) => {
    setNumchoices(e.target.value);
  };
  const handle_pm_atmostchoice = (e) => {
    setAtmostchoice(e.target.value);
  };
  const handle_pm_surveyid = (e) => {
    setSurveyid(e.target.value);
  };
  const handle_pm_choices = (e) => {
    setChoices(e.target.value);
  };
  const handle_pm_projectid = (e) => {
    setProjectid(e.target.value);
  };
  const handle_pm_choice = (e) => {
    setChoice(e.target.value);
  };
  const handle_pm_memberaddr = (e) => {
    setMemberaddr(e.target.value);
  };
  const handle_pm_amount = (e) => {
    setAmount(e.target.value);
  };
  const handle_pm_votedeadline = (e) => {
    setVotedeadline(e.target.value);
  };
  const handle_pm_paymentamounts = (e) => {
    setPaymentamounts(e.target.value);
  };
  const handle_pm_payschedule = (e) => {
    setPayschedule(e.target.value);
  };
  const handle_pm_from = (e) => {
    setFrom(e.target.value);
  };
  const handle_pm_to = (e) => {
    setTo(e.target.value);
  };
  const handle_pm_owner = (e) => {
    setOwner(e.target.value);
  };
  const handle_pm_spender = (e) => {
    setSpender(e.target.value);
  };
  const handle_pm_account = (e) => {
    setAccount(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Web 3.0</title>
      </Head>

      <div className="container">
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand">Web 3.0</a>
          <button className="btn btn-primary" onClick={connectWallet}>
            Connect Metamask
          </button>
        </nav>

        <div>
          <div>
            <h6>Account Name: {account}</h6>
            <h6>Account Balance: {balance}</h6>

            <hr />
          </div>

          <div>
            {users.length > 0 && (
              <div>
                <p>{`Used faucet: ${users.UsedFaucet}`}</p>
                <p>{`My Gov Tokens: ${users.myGovTokens._hex}`}</p>
                <p>{`My Gov Tokens Locked Until: ${users.myGovTokensLockedUntil._hex}`}</p>
              </div>
            )}
            <form className="form">
              <div className="d-flex">
                <input
                  className="form-control"
                  onChange={handleChangeInput}
                  placeholder="User Id"
                />

                <button className="btn btn-info ms-2" onClick={getUser}>
                  {"GetUser"}
                </button>
              </div>
            </form>
            <hr />
          </div>

          {/* submitSurvey */}
          <div>
            {submitSurvey && (
              <div>
                <p>{`surveyid: ${submitSurvey._hex}`}</p>
              </div>
            )}
            <input
              className="form-control"
              onChange={handle_pm_ipfshash}
              placeholder="ipfshash"
            />
            <input
              className="form-control"
              onChange={handle_pm_surveydeadline}
              placeholder="surveydeadline"
            />
            <input
              className="form-control"
              onChange={handle_pm_numchoices}
              placeholder="numchoices"
            />
            <input
              className="form-control"
              onChange={handle_pm_atmostchoice}
              placeholder="atmostchoice"
            />
            <br />
            <button className="btn btn-info" onClick={handle_submitSurvey}>
              submitSurvey
            </button>
            <hr />
          </div>
          {/*  */}
          {/* takeSurvey */}
          <div>
            {takeSurvey && (
              <div>
                <p>{`response: ${takeSurvey}`}</p>
              </div>
            )}
            <input
              className="form-control"
              onChange={handle_pm_surveyid}
              placeholder="surveyid"
            />
            <input
              className="form-control"
              onChange={handle_pm_choices}
              placeholder="choices"
            />

            <br />
            <button className="btn btn-info" onClick={handle_takeSurvey}>
              takeSurvey
            </button>
            <hr />
          </div>
          {/*  */}
          {/* getSurveyResults */}
          <div>
            {getSurveyResults && (
              <div>
                <p>{`numtaken: ${getSurveyResults}`}</p>
                <p>{`results: ${getSurveyResults}`}</p>
              </div>
            )}
            <input
              className="form-control"
              onChange={handle_pm_surveyid}
              placeholder="surveyid"
            />
            <br />
            <button className="btn btn-info" onClick={handle_getSurveyResults}>
              getSurveyResults
            </button>
            <hr />
          </div>
          {/*  */}
          {/* getSurveyInfo */}
          <div>
            {getSurveyInfo && (
              <div>
                <p>{`ipfshash: ${getSurveyInfo.ipfshash}`}</p>
                <p>{`surveydeadline: ${getSurveyInfo.surveydeadline}`}</p>
                <p>{`numchoices: ${getSurveyInfo.numchoices}`}</p>
                <p>{`atmostchoice: ${getSurveyInfo.atmostchoice}`}</p>
              </div>
            )}
            <input
              className="form-control"
              onChange={handle_pm_surveyid}
              placeholder="surveyid"
            />
            <br />
            <button className="btn btn-info" onClick={handle_getSurveyInfo}>
              getSurveyInfo
            </button>
            <hr />
          </div>
          {/*  */}
          {/* getSurveyOwner */}
          <div>
            {getSurveyOwner && (
              <div>
                <p>{`surveyowner: ${getSurveyOwner}`}</p>
              </div>
            )}
            <input
              className="form-control"
              onChange={handle_pm_surveyid}
              placeholder="surveyid"
            />
            <br />
            <button className="btn btn-info" onClick={handle_getSurveyOwner}>
              getSurveyOwner
            </button>
            <hr />
          </div>
          {/*  */}
          {/* getNoOfSurveys */}
          <div>
            {getNoOfSurveys && (
              <div>
                <p>{`Hex: ${getNoOfSurveys._hex}`}</p>
                <p>{`Is Big Number: ${getNoOfSurveys._isBigNumber}`}</p>
              </div>
            )}

            <button className="btn btn-info" onClick={handle_getNoOfSurveys}>
              getNoOfSurveys
            </button>
            <hr />
          </div>
          {/*  */}
          {/* faucet */}
          <div>
            {faucet && (
              <div>
                <p>{`Response: ${faucet}`}</p>
              </div>
            )}

            <button className="btn btn-info" onClick={handle_faucet}>
              faucet
            </button>
            <hr />
          </div>
          {/*  */}
          {/* reserveProjectGrant */}
          <div>
            {reserveProjectGrant && (
              <div>
                <p>{`Response: ${reserveProjectGrant}`}</p>
              </div>
            )}
            <input
              className="form-control"
              onChange={handle_pm_projectid}
              placeholder="projectid"
            />
            <br />
            <button
              className="btn btn-info"
              onClick={handle_reserveProjectGrant}
            >
              reserveProjectGrant
            </button>
            <hr />
          </div>
          {/*  */}
          {/* withdrawProjectPayment */}
          <div>
            {withdrawProjectPayment && (
              <div>
                <p>{`Response: ${withdrawProjectPayment}`}</p>
              </div>
            )}
            <input
              className="form-control"
              onChange={handle_pm_projectid}
              placeholder="projectid"
            />
            <br />
            <button
              className="btn btn-info"
              onClick={handle_withdrawProjectPayment}
            >
              withdrawProjectPayment
            </button>
            <hr />
          </div>
          {/*  */}
          {/* votingforinstallment */}
          <div>
            {votingforinstallment && (
              <div>
                <p>{`Response: ${votingforinstallment}`}</p>
              </div>
            )}
            <input
              className="form-control"
              onChange={handle_pm_projectid}
              placeholder="projectid"
            />
            <input
              className="form-control"
              onChange={handle_pm_choice}
              placeholder="choice"
            />
            <br />
            <button
              className="btn btn-info"
              onClick={handle_votingforinstallment}
            >
              votingforinstallment
            </button>
            <hr />
          </div>
          {/*  */}
          {/* findSchIndex */}
          <div>
            {findSchIndex && (
              <div>
                <p>{`idx: ${findSchIndex._hex}`}</p>
              </div>
            )}
            <input
              className="form-control"
              onChange={handle_pm_projectid}
              placeholder="projectid"
            />
            <br />
            <button className="btn btn-info" onClick={handle_findSchIndex}>
              findSchIndex
            </button>
            <hr />
          </div>
          {/*  */}
          {/* getIsProjectFunded */}
          <div>
            {getIsProjectFunded && (
              <div>
                <p>{`response: ${getIsProjectFunded}`}</p>
              </div>
            )}
            <input
              className="form-control"
              onChange={handle_pm_projectid}
              placeholder="projectid"
            />
            <br />
            <button
              className="btn btn-info"
              onClick={handle_getIsProjectFunded}
            >
              getIsProjectFunded
            </button>
            <hr />
          </div>
          {/*  */}
          {/* getProjectNextPayment */}
          <div>
            {getProjectNextPayment && (
              <div>
                <p>{`next_payment: ${getProjectNextPayment}`}</p>
              </div>
            )}
            <input
              className="form-control"
              onChange={handle_pm_projectid}
              placeholder="projectid"
            />
            <br />
            <button
              className="btn btn-info"
              onClick={handle_getProjectNextPayment}
            >
              getProjectNextPayment
            </button>
            <hr />
          </div>
          {/*  */}
          {/* getProjectOwner */}
          <div>
            {getProjectOwner && (
              <div>
                <p>{`Owner: ${getProjectOwner}`}</p>
              </div>
            )}
            <input
              className="form-control"
              onChange={handle_pm_projectid}
              placeholder="projectid"
            />
            <br />
            <button className="btn btn-info" onClick={handle_getProjectOwner}>
              getProjectOwner
            </button>
            <hr />
          </div>
          {/*  */}
          {/* getProjectInfo */}
          <div>
            {getProjectInfo && (
              <div>
                <p>{`Info: ${getProjectInfo}`}</p>
              </div>
            )}
            <input
              className="form-control"
              onChange={handle_pm_projectid}
              placeholder="projectid"
            />
            <br />
            <button className="btn btn-info" onClick={handle_getProjectInfo}>
              getProjectInfo
            </button>
            <hr />
          </div>
          {/*  */}
          {/* delegateVoteTo */}
          <div>
            {delegateVoteTo && (
              <div>
                <p>{`Info: ${delegateVoteTo}`}</p>
              </div>
            )}
            <input
              className="form-control"
              onChange={handle_pm_memberaddr}
              placeholder="memberaddr"
            />
            <input
              className="form-control"
              onChange={handle_pm_projectid}
              placeholder="projectid"
            />
            <br />
            <button className="btn btn-info" onClick={handle_delegateVoteTo}>
              delegateVoteTo
            </button>
            <hr />
          </div>
          {/*  */}
          {/* donateEther */}
          <div>
            {donateEther && (
              <div>
                <p>{`Info: ${donateEther}`}</p>
              </div>
            )}
            <br />
            <button className="btn btn-info" onClick={handle_donateEther}>
              donateEther
            </button>
            <hr />
          </div>
          {/*  */}
          {/* donateMyGovToken */}
          <div>
            {donateMyGovToken && (
              <div>
                <p>{`Info: ${donateMyGovToken}`}</p>
              </div>
            )}
            <input
              className="form-control"
              onChange={handle_pm_amount}
              placeholder="amount"
            />
            <br />
            <button className="btn btn-info" onClick={handle_donateMyGovToken}>
              donateMyGovToken
            </button>
            <hr />
          </div>
          {/*  */}
          {/* voteForProjectProposal */}
          <div>
            {voteForProjectProposal && (
              <div>
                <p>{`Info: ${voteForProjectProposal}`}</p>
              </div>
            )}
            <input
              className="form-control"
              onChange={handle_pm_projectid}
              placeholder="projectid"
            />
            <input
              className="form-control"
              onChange={handle_pm_choice}
              placeholder="choice"
            />
            <br />
            <button
              className="btn btn-info"
              onClick={handle_voteForProjectProposal}
            >
              voteForProjectProposal
            </button>
            <hr />
          </div>
          {/*  */}
          {/* submitProjectProposal */}
          <div>
            {submitProjectProposal && (
              <div>
                <p>{`Project_id: ${submitProjectProposal._hex}`}</p>
              </div>
            )}
            <input
              className="form-control"
              onChange={handle_pm_ipfshash}
              placeholder="ipfshash"
            />
            <input
              className="form-control"
              onChange={handle_pm_votedeadline}
              placeholder="votedeadline"
            />
            <input
              className="form-control"
              onChange={handle_pm_paymentamounts}
              placeholder="paymentamounts"
            />
            <input
              className="form-control"
              onChange={handle_pm_payschedule}
              placeholder="payschedule"
            />
            <br />
            <button
              className="btn btn-info"
              onClick={handle_submitProjectProposal}
            >
              submitProjectProposal
            </button>
            <hr />
          </div>
          {/*  */}
          {/* getNoOfProjectProposals */}
          <div>
            {getNoOfProjectProposals && (
              <div>
                <p>{`projectProposals.length: ${getNoOfProjectProposals._hex}`}</p>
              </div>
            )}

            <br />
            <button
              className="btn btn-info"
              onClick={handle_getNoOfProjectProposals}
            >
              getNoOfProjectProposals
            </button>
            <hr />
          </div>
          {/*  */}
          {/* getNoOfFundedProjects */}
          <div>
            {getNoOfFundedProjects && (
              <div>
                <p>{`Info: ${getNoOfFundedProjects._hex}`}</p>
              </div>
            )}

            <br />
            <button
              className="btn btn-info"
              onClick={handle_getNoOfFundedProjects}
            >
              getNoOfFundedProjects
            </button>
            <hr />
          </div>
          {/*  */}
          {/* getEtherReceivedByProject */}
          <div>
            {getEtherReceivedByProject && (
              <div>
                <p>{`Projectid: ${getEtherReceivedByProject._hex}`}</p>
              </div>
            )}

            <br />
            <button
              className="btn btn-info"
              onClick={handle_getEtherReceivedByProject}
            >
              getEtherReceivedByProject
            </button>
            <hr />
          </div>
          {/*  */}
          {/* transferToken */}
          <div>
            {transferToken && (
              <div>
                <p>{`Bool: ${transferToken}`}</p>
              </div>
            )}
            <input
              className="form-control"
              onChange={handle_pm_to}
              placeholder="to"
            />
            <input
              className="form-control"
              onChange={handle_pm_amount}
              placeholder="amount"
            />
            <br />
            <button className="btn btn-info" onClick={handle_transferToken}>
              transferToken
            </button>
            <hr />
          </div>
          {/*  */}
          {/* transferTokensFrom */}
          <div>
            {transferTokensFrom && (
              <div>
                <p>{`Bool: ${transferTokensFrom}`}</p>
              </div>
            )}
            <input
              className="form-control"
              onChange={handle_pm_from}
              placeholder="from"
            />
            <input
              className="form-control"
              onChange={handle_pm_to}
              placeholder="to"
            />

            <input
              className="form-control"
              onChange={handle_pm_amount}
              placeholder="amount"
            />
            <br />
            <button
              className="btn btn-info"
              onClick={handle_transferTokensFrom}
            >
              transferTokensFrom
            </button>
            <hr />
          </div>
          {/*  */}
          {/* allowanceToken */}
          <div>
            {allowanceToken && (
              <div>
                <p>{`Info: ${allowanceToken}`}</p>
              </div>
            )}
            <input
              className="form-control"
              onChange={handle_pm_owner}
              placeholder="owner"
            />
            <input
              className="form-control"
              onChange={handle_pm_spender}
              placeholder="spender"
            />
            <br />
            <button className="btn btn-info" onClick={handle_allowanceToken}>
              allowanceToken
            </button>
            <hr />
          </div>
          {/*  */}
          {/* approveToken */}
          <div>
            {approveToken && (
              <div>
                <p>{`Bool: ${approveToken}`}</p>
              </div>
            )}

            <input
              className="form-control"
              onChange={handle_pm_spender}
              placeholder="spender"
            />
            <input
              className="form-control"
              onChange={handle_pm_amount}
              placeholder="amount"
            />
            <br />
            <button className="btn btn-info" onClick={handle_approveToken}>
              approveToken
            </button>
            <hr />
          </div>
          {/*  */}
          {/* totalTokenSupply */}
          <div>
            {totalTokenSupply && (
              <div>
                <p>{`INfo: ${totalTokenSupply}`}</p>
              </div>
            )}
            <br />
            <button className="btn btn-info" onClick={handle_totalTokenSupply}>
              totalTokenSupply
            </button>
            <hr />
          </div>
          {/*  */}
          {/* tokenBalanceOf */}
          <div>
            {tokenBalanceOf && (
              <div>
                <p>{`Balance: ${tokenBalanceOf}`}</p>
              </div>
            )}
            <input
              className="form-control"
              onChange={handle_pm_account}
              placeholder="account"
            />
            <br />
            <button className="btn btn-info" onClick={handle_tokenBalanceOf}>
              tokenBalanceOf
            </button>
            <hr />
          </div>
          {/*  */}
        </div>
      </div>
    </>
  );
}
