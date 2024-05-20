import { useReducer } from "react";

const initialFriends = [
  {id: crypto.randomUUID(), name: "Henrique", photo: "henrique-48.jpg", balance: 0, selected: false},
  {id: crypto.randomUUID(), name: "Renata", photo: "renata-48.jpg", balance: -20, selected: false},
  {id: crypto.randomUUID(), name: "Antonio", photo: "antonio-48.jpg", balance: 7, selected: false},
];

const reducer = (state, action) => ({
  set_friends: {...state, friends: action.friends},
  set_selectedFriend: {...state, selectedFriend: action.selectedFriend},
  set_totalBill: {...state, totalBill: action.totalBill},
  set_costs: {...state, costs: action.costs},
  set_whoIsGonnaPay: {...state, whoIsGonnaPay: action.whoIsGonnaPay},
  set_showFormAddFriend: {...state, showFormAddFriend: action.showFormAddFriend},
  set_friendName: {...state, friendName: action.friendName},
  set_friendPhoto: {...state, friendPhoto: action.friendPhoto},
})[action.type] || state

const App = () => {
  const [state, dispatch] = useReducer(reducer, {friends: initialFriends, selectedFriend: null, totalBill: "", costs: "", whoIsGonnaPay: "you", 
  showFormAddFriend: false, friendName: "", friendPhoto: ""})

  const getMessageInfo = (balance) => {
    let messageInfo;
  
    if (balance > 0) {
      messageInfo = {
        message: `Você deve ${balance} reais`,
        color: "green-credit",
      };
    } else if (balance < 0) {
      messageInfo = {
        message: `Te deve ${-balance} reais`,
        color: "red-debit",
      };
    } else {
      messageInfo = {
        message: `Estão quites`,
        color: "white-neutral",
      };
    }
  
    return messageInfo;
  };

  const handleClickFriend = (friend) => {
    dispatch({type: "set_selectedFriend", selectedFriend: state.selectedFriend?.id === friend.id ? null : friend})
  };

  const handleClickCalculateBill = (e) => {
    e.preventDefault();
    const balance = +state.totalBill - +state.costs;

    dispatch({type: "set_friends", friends: state.friends?.map((friend) =>
    friend.id === state.selectedFriend.id
      ? {
          ...friend,
          balance:
            state.whoIsGonnaPay === "you"
              ? state.selectedFriend.balance - balance
              : state.selectedFriend.balance + balance,
        }
      : friend
  )})

    dispatch({type: "set_totalBill", totalBill: ""})
    dispatch({type: "set_costs", costs: ""})
    dispatch({type: "set_selectedFriend", selectedFriend: null})
  };

  const handleChangeGetTotalBill = (e) => dispatch({type: "set_totalBill", totalBill: e.target.value})

  const handleChangeGetCosts = (e) => dispatch({type: "set_costs", costs: e.target.value})

  const handleSelectWhoWillPay = (e) => dispatch({type: "set_whoIsGonnaPay", whoIsGonnaPay: e.target.value})

  const handleClickShowAddFriend = () => dispatch({type: "set_showFormAddFriend", showFormAddFriend: !state.showFormAddFriend})

  const handleChangeGetFriendName = (e) => dispatch({type: "set_friendName", friendName: e.target.value})

  const handleChangeGetFriendPhoto = (e) =>dispatch({type: "set_friendPhoto", friendPhoto: e.target.value})

  const handleClickAddFriend = () => {
    dispatch({type: "set_friends", friends: [...state.friends, {id: crypto.randomUUID(), name: state.friendName, photo: state.friendPhoto, balance: 0, selected: false,}]})
    dispatch({type: "set_friendName", friendName: ""})
    dispatch({type: "set_friendPhoto", friendPhoto: ""})
    dispatch({type: "set_showFormAddFriend", showFormAddFriend: false})
  }

  return (
    <>
      <header className="header">
        <img src="logo-racha-conta.png" alt="log racha conta" />
      </header>
      <main className="app">
        <aside className="sidebar">
          <ul>
            {state.friends?.map((friend) => {
              const { message, color } = getMessageInfo(friend.balance);
              const isSelectedFriend = friend.id === state.selectedFriend?.id;

              return (
                <li key={friend.id}>
                  <img src={friend.photo} alt={`avatar ${friend.name}`} />
                  <h3>{friend.name}</h3>
                  <p className={color}>{message}</p>
                  <button
                    className={`button ${
                      isSelectedFriend ? "button-close" : null
                    }`}
                    onClick={() => handleClickFriend(friend)}
                  >
                    {isSelectedFriend ? "Fechar" : "Selecionar"}
                  </button>
                </li>
              );
            })}
          </ul>
          {state.showFormAddFriend && (
            <form className="form-add-friend" onSubmit={handleClickAddFriend}>
              <label>
              🧍‍♂️ Nome <input type="text" value={state.friendName} onChange={handleChangeGetFriendName}/>
            </label>
            <label>
              📷 Foto <input type="text" value={state.friendPhoto} onChange={handleChangeGetFriendPhoto}/>
            </label>
            <button className="button">Adicionar</button>
            </form>
          )}

          <button className={`button ${state.showFormAddFriend ? "button-close" : ""}`} onClick={handleClickShowAddFriend}>{state.showFormAddFriend ? "Fechar" : "Adicionar Amigo(a)"}</button>          
        </aside>

        {state.selectedFriend && (
          <form className="form-split-bill" onSubmit={handleClickCalculateBill}>
            <h2>Rache a conta com {state.selectedFriend?.name}</h2>
            <label>
              💰 Valor total <input type="number" value={state.totalBill} onChange={handleChangeGetTotalBill}/>
            </label>
            <label>
              💸 Seus gastos <input type="number" value={state.costs} onChange={handleChangeGetCosts}/>
            </label>
            <label>
              🤑 Quem vai pagar <select onChange={handleSelectWhoWillPay}>
                <option value="you">Você</option>
                <option value={state.selectedFriend?.name}>
                  {state.selectedFriend?.name}
                </option>
              </select>
            </label>
            <button className="button">Rachar conta</button>
          </form>
        )}
      </main>
    </>
  );
};

export default App;
