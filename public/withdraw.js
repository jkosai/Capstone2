function Withdraw(){
  const ctx = React.useContext(UserContext); 
  let user = ctx.user;
  console.log(ctx);
  const [update, setUpdate] = React.useState('false');
  const [value, setValue] = React.useState("");
  const [show, setShow] = React.useState(true);

  const handleTextChange = (event) => {
    setValue(event.target.value);
  }; 

  function handleWithdraw(){
    let balance = document.getElementById("balance").value;
    if (balance > 0 && user.balance >= balance && !isNaN(balance)) {
    user.balance -= Number(balance);
    setUpdate(true);
    setShow(false);
    
    fetch(`/account/update/${user.email}/${-balance}`)
    .then(response => response.text())
    .then(text => {
      try {
        const data = JSON.parse(text);
        setStatus(JSON.stringify(data.amount));
        console.log('JSON:', data);
      } catch(err) {
        props.setStatus('Withdraw failed')
        console.log('err:', text);
      }
    });
  
      
  }
    else{
      alert("Transaction Failed");
    }
  }

  return (
    <Card
    txtcolor="black"
    header="Withdraw"
    body= {show? (user.email ? ( 
      <>
      <h5>{update ? "Balance: " + user.balance : "Balance: "+ user.balance}</h5>
      <h6>Withdraw Amount</h6>
      <input type="number" width="200" id="balance" onChange={handleTextChange} value={value}></input>
      <button type="submit" disabled={ value ?false:true} className="btn btn-light" onClick={handleWithdraw}>Withdraw</button>
      </>
      ) : ("Please Log In")) : ( "Success! Balance: $" + user.balance)}
    
  />    
  )
}