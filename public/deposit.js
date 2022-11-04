function Deposit(){
  const ctx = React.useContext(UserContext); 
  let user = ctx.user;
  console.log(ctx);
  const [update, setUpdate] = React.useState('false');
  const [value, setValue] = React.useState("");
  const [show, setShow] = React.useState(true);

  const handleTextChange = (event) => {
    setValue(event.target.value);
  }; 

  function handleDeposit(){
    let balance = document.getElementById("balance").value;
    if (balance > 0 && !isNaN(balance)) {
    user.balance += Number(balance);
    setUpdate(true);
    setShow(false);

    fetch(`/account/update/${user.email}/${balance}`)
    .then(response => response.text())
    .then(text => {
      try {
        const data = JSON.parse(text);
        setStatus(JSON.stringify(data.amount));
        console.log('JSON:', data);
      } catch(err) {
        props.setStatus('Deposit failed')
        console.log('err:', text);
      }
    });


    }
    else{
      alert("Must be a positive number");
    }
  }

  return (
    <Card
    txtcolor="black"
    header="Deposit"
    body= {show? (user.email ? ( 
      <>
      
      <h5>{update ? "Balance: " + user.balance : "Balance: "+ user.balance}</h5>
      <h6>Deposit Amount</h6>
      <input type="number" width="200" id="balance" onChange={handleTextChange} value={value}></input>
      <button type="submit" disabled={ value ?false:true} className="btn btn-light" onClick={handleDeposit}>Deposit</button>
      </>
      ) : ("Please Log In")) : ( "Success! Balance: $" + user.balance)}
    
  />    
  )
}

