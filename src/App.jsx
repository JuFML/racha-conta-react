import { useState } from "react";

const App = () => {
  const initialFriends = [
    {
      id: crypto.randomUUID(),
      name: "Henrique",
      photo: "henrique-48.jpg",
      balance: 0,
      selected: false,
    },
    {
      id: crypto.randomUUID(),
      name: "Renata",
      photo: "renata-48.jpg",
      balance: -20,
      selected: false,
    },
    {
      id: crypto.randomUUID(),
      name: "Antonio",
      photo: "antonio-48.jpg",
      balance: 7,
      selected: false,
    },
  ];

  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [totalBill, setTotalBill] = useState("");
  const [costs, setCosts] = useState("");
  const [whoIsGonnaPay, setWhoIsGonnaPay] = useState("you");

  const getMessageInfo = (balance) =>
    balance > 0
      ? {
          message: `Você deve ${balance} reais`,
          color: "green-credit",
        }
      : balance < 0
      ? {
          message: `Te deve ${-balance} reais`,
          color: "red-debit",
        }
      : {
          message: `Estão quites`,
          color: "white-neutral",
        };

  const handleClickFriend = (friend) => {
    setSelectedFriend((prev) => (prev?.id === friend.id ? null : friend));
  };

  const handleClickCalculateBill = (e) => {
    e.preventDefault();
    const balance = +totalBill - +costs;

    setFriends((prev) =>
      prev.map((friend) =>
        friend.id === selectedFriend.id
          ? {
              ...friend,
              balance:
                whoIsGonnaPay === "you"
                  ? selectedFriend.balance - (+totalBill - +costs)
                  : selectedFriend.balance + (+totalBill - +costs),
            }
          : friend
      )
    );
    setTotalBill("");
    setCosts("");
    setSelectedFriend(null);
  };

  const handleChangeGetTotalBill = (e) => {
    setTotalBill(e.target.value);
  };

  const handleChangeGetCosts = (e) => {
    setCosts(e.target.value);
  };

  const handleSelectWhoWillPay = (e) => {
    setWhoIsGonnaPay(e.target.value);
  };

  return (
    <>
      <header className="header">HEADER</header>
      <main className="app">
        <aside className="sidebar">
          <ul>
            {friends.map((friend) => {
              const { message, color } = getMessageInfo(friend.balance);
              const isSelectedFriend = friend.id === selectedFriend?.id;

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
          <button className="button">Adicionar Amigo(a)</button>
        </aside>

        {selectedFriend && (
          <form className="form-split-bill" onSubmit={handleClickCalculateBill}>
            <h2>Rache a conta com {selectedFriend?.name}</h2>
            <label>
              💰 Valor total
              <input
                type="number"
                value={totalBill}
                onChange={handleChangeGetTotalBill}
              />
            </label>
            <label>
              💸 Seus gastos
              <input
                type="number"
                value={costs}
                onChange={handleChangeGetCosts}
              />
            </label>
            <label>
              🤑 Quem vai pagar
              <select onChange={handleSelectWhoWillPay}>
                <option value="you">Você</option>
                <option value={selectedFriend?.name}>
                  {selectedFriend?.name}
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
