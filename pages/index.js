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
  const [useraddress, setUseraddress] = useState("");
  const [balanceOf, setBalanceOf] = useState("");

  // --------------------------------
  // STATE_LIST OF RETURN VALUES
  const [isMember, set_isMember] = useState(null);
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
  const [mint, set_mint] = useState(null);

  // HANDLE_LIST OF BUTTONS=> These functions are called when the buttons are clicked.
  const handle_balanceOf = async () => {
    contract
      .balanceOf(useraddress)
      .then((resp) => setBalanceOf(resp))
      .catch((e) => {
        setBalanceOf(e.message);
        console.log(e);
      });
  };

  const handle_isMember = () => {
    contract
      .isMember(useraddress)
      .then((resp) => set_isMember(resp))
      .catch((e) => {
        set_isMember(e.message);
        console.log(e);
      });
  };

  const handle_submitSurvey = () => {
    contract
      .submitSurvey(ipfshash, surveydeadline, numchoices, atmostchoice, {
        gasLimit: 3000000,
      })
      .then((resp) => {
        set_submitSurvey(resp);
        console.log(resp);
      })
      .catch((e) => {
        set_submitSurvey(e.message);
        console.log(e);
      });
  };
  const handle_takeSurvey = () => {
    //Object.entries(choices) converts the object to an array.
    const arr = choices.split(",");
    contract
      .takeSurvey(surveyid, arr)
      .then((resp) => set_takeSurvey(resp))
      .catch((e) => {
        set_takeSurvey(e.message);
        console.log(e);
      });
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
    contract
      .faucet({ gasLimit: 3000000 })
      .then((resp) => {
        set_faucet(resp);
        console.log(resp);
      })
      .catch((e) => {
        set_faucet(e.message);
      });
  };
  const handle_reserveProjectGrant = () => {
    contract
      .reserveProjectGrant(projectid)
      .then((resp) => {
        set_reserveProjectGrant(resp);
        console.log(resp);
      })
      .catch((e) => {
        set_reserveProjectGrant(e.message);
      });
  };
  const handle_withdrawProjectPayment = () => {
    contract.withdrawProjectPayment(projectid).then((resp) => {
      set_withdrawProjectPayment(resp);
      console.log(resp);
    });
  };
  const handle_votingforinstallment = () => {
    contract
      .votingforinstallment(projectid, choice)
      .then((resp) => {
        set_votingforinstallment(resp);
        console.log(resp);
      })
      .catch((e) => {
        set_votingforinstallment(e.message);
      });
  };
  const handle_findSchIndex = () => {
    contract
      .findSchIndex(projectid)
      .then((resp) => {
        set_findSchIndex(resp);
        console.log(resp);
      })
      .catch((e) => {
        set_findSchIndex(e.message);
      });
  };
  const handle_getIsProjectFunded = () => {
    contract
      .getIsProjectFunded(projectid)
      .then((resp) => {
        set_getIsProjectFunded(resp);
        console.log(resp);
      })
      .catch((e) => {
        set_getIsProjectFunded(e.message);
      });
  };
  const handle_getProjectNextPayment = () => {
    contract
      .getProjectNextPayment(projectid)
      .then((resp) => {
        set_getProjectNextPayment(resp);
        console.log(resp);
      })
      .catch((e) => {
        set_getProjectNextPayment(e.message);
      });
  };
  const handle_getProjectOwner = () => {
    contract
      .getProjectOwner(projectid)
      .then((resp) => {
        set_getProjectOwner(resp);
        console.log(resp);
      })
      .catch((e) => {
        set_getProjectOwner(e.message);
      });
  };
  const handle_getProjectInfo = () => {
    contract
      .getProjectInfo(projectid)
      .then((resp) => {
        set_getProjectInfo(resp);
        console.log(resp);
      })
      .catch((e) => {
        set_getProjectInfo(e.message);
      });
  };
  const handle_delegateVoteTo = () => {
    contract
      .delegateVoteTo(memberaddr, projectid)
      .then((resp) => {
        set_delegateVoteTo(resp);
        console.log(resp);
      })
      .catch((e) => {
        set_delegateVoteTo(e.message);
      });
  };
  const handle_donateEther = () => {
    contract
      .donateEther({ gasLimit: 3000000 })
      .then((resp) => {
        set_donateEther(resp);
        console.log(resp);
      })
      .catch((e) => {
        set_donateEther(e.message);
      });
  };
  const handle_donateMyGovToken = () => {
    contract
      .donateMyGovToken(amount)
      .then((resp) => {
        set_donateMyGovToken(resp);
        console.log(resp);
      })
      .catch((e) => {
        set_donateMyGovToken(e.message);
      });
  };
  const handle_voteForProjectProposal = () => {
    contract
      .voteForProjectProposal(projectid, choice)
      .then((resp) => {
        set_voteForProjectProposal(resp);
        console.log(resp);
      })
      .catch((e) => {
        set_voteForProjectProposal(e.message);
      });
  };
  const handle_submitProjectProposal = () => {
    const ar_payment = paymentamounts.split(",");
    const ar_schedule = payschedule.split(",");
    contract
      .submitProjectProposal(ipfshash, votedeadline, ar_payment, ar_schedule, {
        gasLimit: 30000000,
      })
      .then((resp) => set_submitProjectProposal(resp))
      .catch((e) => {
        set_submitProjectProposal(e.message);
      });
  };
  const handle_getNoOfProjectProposals = () => {
    contract
      .getNoOfProjectProposals()
      .then((resp) => {
        set_getNoOfProjectProposals(resp);
        console.log(resp);
      })
      .catch((e) => {
        set_getNoOfProjectProposals(e.message);
      });
  };
  const handle_getNoOfFundedProjects = () => {
    contract
      .getNoOfFundedProjects()
      .then((resp) => {
        set_getNoOfFundedProjects(resp);
        console.log(resp);
      })
      .catch((e) => {
        set_getNoOfFundedProjects(e.message);
      });
  };
  const handle_getEtherReceivedByProject = () => {
    contract
      .getEtherReceivedByProject(projectid)
      .then((resp) => {
        set_getEtherReceivedByProject(resp);
        console.log(resp);
      })
      .catch((e) => {
        set_getEtherReceivedByProject(e.message);
      });
  };
  const handle_transferToken = () => {
    contract
      .transferToken(to, amount)
      .then((resp) => {
        set_transferToken(resp);
        console.log(resp);
      })
      .catch((e) => {
        set_transferToken(e.message);
      });
  };
  const handle_transferTokensFrom = () => {
    contract
      .transferTokensFrom(from, to, amount)
      .then((resp) => {
        set_transferTokensFrom(resp);
        console.log(resp);
      })
      .catch((e) => {
        set_transferTokensFrom(e.message);
      });
  };
  const handle_allowanceToken = () => {
    contract
      .allowanceToken(owner, spender)
      .then((resp) => {
        set_allowanceToken(resp);
        console.log(resp);
      })
      .catch((e) => {
        set_allowanceToken(e.message);
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
  const handle_mint = () => {
    contract
      .mint(to, amount)
      .then((resp) => {
        set_mint(resp);
        console.log(resp);
      })
      .catch((e) => {
        set_mint(e.message);
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
  const handle_pm_useraddress = (e) => {
    setUseraddress(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Web 3.0</title>
      </Head>

      <div className="container">
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand">Web 3.0</a>
          {account > 0 ? (
            <button
              className="btn btn-primary"
              onClick={connectWallet}
              disabled
            >
              Connected
            </button>
          ) : (
            <button className="btn btn-primary" onClick={connectWallet}>
              Connect Metamask
            </button>
          )}
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
                <p>{`${JSON.stringify(users)}`}</p>
                <p>{`Used faucet: ${users.UsedFaucet}`}</p>
                <p>{`My Gov Tokens: ${users.myGovTokens._hex}`}</p>
                <p>{`My Gov Tokens Locked Until: ${users.myGovTokensLockedUntil._hex}`}</p>
                <p>{`${JSON.stringify(users)}`}</p>
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

          {/*  */}
          {/* balanceOf */}
          <div>
            {balanceOf && (
              <div>
                <p>{`${JSON.stringify(balanceOf)}`}</p>
              </div>
            )}
            <input
              className="form-control"
              onChange={handle_pm_useraddress}
              placeholder="useraddress"
            />
            <br />
            <button className="btn btn-info" onClick={handle_balanceOf}>
              balanceOf
            </button>
            <hr />
          </div>
          {/*  */}
          {/* isMember */}
          <div>
            {isMember && (
              <div>
                <p>{`${JSON.stringify(isMember)}`}</p>
              </div>
            )}
            <input
              className="form-control"
              onChange={handle_pm_useraddress}
              placeholder="useraddress"
            />
            <br />
            <button className="btn btn-info" onClick={handle_isMember}>
              isMember
            </button>
            <hr />
          </div>
          {/*  */}
          {/* submitSurvey */}
          <div>
            {submitSurvey && (
              <div>
                <p>{`${JSON.stringify(submitSurvey)}`}</p>
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
                <p>{`${JSON.stringify(takeSurvey)}`}</p>
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
              placeholder="choices Ex: 2,3 or  4,5"
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
                <p>{`${JSON.stringify(getSurveyResults)}`}</p>
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
                <p>{`${JSON.stringify(getSurveyInfo)}`}</p>
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
                <p>{`${JSON.stringify(getSurveyOwner)}`}</p>
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
                <p>{`${JSON.stringify(getNoOfSurveys)}`}</p>
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
                <p>{`${JSON.stringify(faucet)}`}</p>
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
                <p>{`${JSON.stringify(reserveProjectGrant)}`}</p>
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
                <p>{`${JSON.stringify(withdrawProjectPayment)}`}</p>
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
                <p>{`${JSON.stringify(votingforinstallment)}`}</p>
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
                <p>{`${JSON.stringify(findSchIndex)}`}</p>
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
                <p>{`${JSON.stringify(getIsProjectFunded)}`}</p>
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
                <p>{`${JSON.stringify(getProjectNextPayment)}`}</p>
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
                <p>{`${JSON.stringify(getProjectOwner)}`}</p>
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
                <p>{`${JSON.stringify(getProjectInfo)}`}</p>
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
                <p>{`${JSON.stringify(delegateVoteTo)}`}</p>
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

          {/* donateMyGovToken */}
          <div>
            {donateMyGovToken && (
              <div>
                <p>{`${JSON.stringify(donateMyGovToken)}`}</p>
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
                <p>{`${JSON.stringify(voteForProjectProposal)}`}</p>
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
                <p>{`${JSON.stringify(submitProjectProposal)}`}</p>
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
              placeholder="paymentamounts Ex: 2,3 or  4,5"
            />
            <input
              className="form-control"
              onChange={handle_pm_payschedule}
              placeholder="payschedule Ex: 2,3 or  4,5"
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
                <p>{`${JSON.stringify(getNoOfProjectProposals)}`}</p>
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
                <p>{`${JSON.stringify(getNoOfFundedProjects)}`}</p>
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
                <p>{`${JSON.stringify(getEtherReceivedByProject)}`}</p>
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
              onClick={handle_getEtherReceivedByProject}
            >
              getEtherReceivedByProject
            </button>
            <hr />
          </div>
          {/*  */}
        </div>
      </div>
    </>
  );
}

// {/* donateEther */}
// <div>
//   {donateEther && (
//     <div>
//       <p>{`${JSON.stringify(donateEther)}`}</p>
//     </div>
//   )}
//   <input
//     className="form-control"
//     onChange={handle_pm_amount}
//     placeholder="amount"
//   />
//   <br />
//   <button className="btn btn-info" onClick={handle_donateEther}>
//     donateEther
//   </button>
//   <hr />
// </div>
// {/*  */}
// {
//   /* transferToken */
// }
// <div>
//   {transferToken && (
//     <div>
//       <p>{`${JSON.stringify(transferToken)}`}</p>
//     </div>
//   )}
//   <input className="form-control" onChange={handle_pm_to} placeholder="to" />
//   <input
//     className="form-control"
//     onChange={handle_pm_amount}
//     placeholder="amount"
//   />
//   <br />
//   <button className="btn btn-info" onClick={handle_transferToken}>
//     transferToken
//   </button>
//   <hr />
// </div>;
// {
//   /*  */
// }
// {
//   /* transferTokensFrom */
// }
// <div>
//   {transferTokensFrom && (
//     <div>
//       <p>{`${JSON.stringify(transferTokensFrom)}`}</p>
//     </div>
//   )}
//   <input
//     className="form-control"
//     onChange={handle_pm_from}
//     placeholder="from"
//   />
//   <input className="form-control" onChange={handle_pm_to} placeholder="to" />

//   <input
//     className="form-control"
//     onChange={handle_pm_amount}
//     placeholder="amount"
//   />
//   <br />
//   <button className="btn btn-info" onClick={handle_transferTokensFrom}>
//     transferTokensFrom
//   </button>
//   <hr />
// </div>;
// {
//   /*  */
// }
// {
//   /* allowanceToken */
// }
// <div>
//   {allowanceToken && (
//     <div>
//       <p>{`${JSON.stringify(allowanceToken)}`}</p>
//     </div>
//   )}
//   <input
//     className="form-control"
//     onChange={handle_pm_owner}
//     placeholder="owner"
//   />
//   <input
//     className="form-control"
//     onChange={handle_pm_spender}
//     placeholder="spender"
//   />
//   <br />
//   <button className="btn btn-info" onClick={handle_allowanceToken}>
//     allowanceToken
//   </button>
//   <hr />
// </div>;
// {
//   /*  */
// }
// {
//   /* approveToken */
// }
// <div>
//   {approveToken && (
//     <div>
//       <p>{`${JSON.stringify(approveToken)}`}</p>
//     </div>
//   )}

//   <input
//     className="form-control"
//     onChange={handle_pm_spender}
//     placeholder="spender"
//   />
//   <input
//     className="form-control"
//     onChange={handle_pm_amount}
//     placeholder="amount"
//   />
//   <br />
//   <button className="btn btn-info" onClick={handle_approveToken}>
//     approveToken
//   </button>
//   <hr />
// </div>;
// {
//   /*  */
// }
// {
//   /* totalTokenSupply */
// }
// <div>
//   {totalTokenSupply && (
//     <div>
//       <p>{`${JSON.stringify(totalTokenSupply)}`}</p>
//     </div>
//   )}
//   <br />
//   <button className="btn btn-info" onClick={handle_totalTokenSupply}>
//     totalTokenSupply
//   </button>
//   <hr />
// </div>;
// {
//   /*  */
// }
// {
//   /* tokenBalanceOf */
// }
// <div>
//   {tokenBalanceOf && (
//     <div>
//       <p>{`${JSON.stringify(tokenBalanceOf)}`}</p>
//     </div>
//   )}
//   <input
//     className="form-control"
//     onChange={handle_pm_account}
//     placeholder="account"
//   />
//   <br />
//   <button className="btn btn-info" onClick={handle_tokenBalanceOf}>
//     tokenBalanceOf
//   </button>
//   <hr />
// </div>;
// {
//   /*  */
// }

// {
//   /* mint */
// }
// <div>
//   {mint && (
//     <div>
//       <p>{`${JSON.stringify(mint)}`}</p>
//     </div>
//   )}
//   <input className="form-control" onChange={handle_pm_to} placeholder="to" />
//   <input
//     className="form-control"
//     onChange={handle_pm_amount}
//     placeholder="amount"
//   />
//   <br />
//   <button className="btn btn-info" onClick={handle_mint}>
//     mint
//   </button>
//   <hr />
// </div>;
// {
//   /*  */
// }
