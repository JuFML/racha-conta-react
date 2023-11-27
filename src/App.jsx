import { useState } from "react";

const App = () => {
  const initialFriends = [
    {
      Id: crypto.randomUUID(),
      friendsName: "Henrique",
      photo: "henrique-48.jpg",
      balance: 0,
      selected: false,
    },
    {
      Id: crypto.randomUUID(),
      friendsName: "Renata",
      photo: "renata-48.jpg",
      balance: -20,
      selected: false,
    },
    {
      Id: crypto.randomUUID(),
      friendsName: "Antonio",
      photo: "antonio-48.jpg",
      balance: 7,
      selected: false,
    },
  ];

  const [friends, setFriends] = useState(initialFriends);
  const [showForm, setShowForm] = useState(false);

  let allFriends = [...friends];

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

  const handleSelectClick = (name) => {
    allFriends = [...friends];
    console.log(allFriends);
    allFriends.filter(
      (friend) => friend.friendsName === name
    )[0].selected = true;
    // console.log((clickedFriend[0].selected = true));
    console.log(allFriends);
    // setFriends((prev) => [...prev, ...(clickedFriend.selected === true)]);
    setShowForm(true);
  };

  return (
    <>
      <header className="header">HEADER</header>
      <main className="app">
        <aside className="sidebar">
          <ul>
            {allFriends.map(({ friendsName, photo, balance }, index) => {
              const { message, color } = getMessageInfo(balance);

              return (
                <li key={index}>
                  <img src={photo} alt={`avatar ${friendsName}`} />
                  <h3>{friendsName}</h3>
                  <p className={color}>{message}</p>
                  <button
                    className="button"
                    onClick={() => handleSelectClick(friendsName)}
                  >
                    Selecionar
                  </button>
                </li>
              );
            })}
          </ul>
          <button className="button">Adicionar Amigo(a)</button>
        </aside>

        <form className="form-split-bill">
          <h2>Rache a conta com _NOME_</h2>
          <label>
            💰 Valor total
            <input type="number" defaultValue={100} />
          </label>
          <label>
            💸 Seus gastos
            <input type="number" defaultValue={50} />
          </label>
          <label>
            🤑 Quem vai pagar
            <select>
              <option value="you">Você</option>
              <option value="_NOME_">_NOME_</option>
            </select>
          </label>
          <button className="button">Rachar conta</button>
        </form>
        {showForm && <>Mostra FORM</>}
      </main>
    </>
  );
};

export default App;
