function Transfer(){
    const ctx = React.useContext(UserContext); 
    let user = ctx.user;
    const [update, setUpdate] = React.useState('false');
    const [value, setValue] = React.useState("");
    const [recipientEmail, setRecipientEmail] = React.useState("");
    const [show, setShow] = React.useState(true);
  
    const handleTextChange = (event) => {
        setValue(event.target.value);
    }; 
    const handleTextChange2 = (event) => {
        setRecipientEmail(event.target.value);
    }; 
  
    function handleTransfer(){
      let balance = document.getElementById("balance").value;
      let recipient = document.getElementById("recipient").value;
      if (balance > 0 && user.balance >= balance && !isNaN(balance)) {
      user.balance -= Number(balance);
      setUpdate(true);
      setShow(false);
      

        ///transfer to recipient

    fetch(`/account/update/${user.email}/${-balance}`)
    .then(response => response.text())
    .then(text => {
      try {
        const data = JSON.parse(text);
        setStatus(JSON.stringify(data.amount));
        console.log('JSON:', data);
      } catch(err) {
        console.log('err:', text);
      }
    });

    

    fetch(`/account/update/${recipient}/${balance}`)
    .then(response => response.text())
    .then(text => {
      try {
        const data = JSON.parse(text);
        setStatus(JSON.stringify(data.amount));
        console.log('JSON:', data);
      } catch(err) {
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
      header="Transfer"
      body= {show? (user.email ? ( 
        <>
        <h5>{update ? "Balance: " + user.balance : "Balance: "+ user.balance}</h5>
        <h6>Transfer Amount</h6>
        <input type="number" width="200" id="balance" onChange={handleTextChange} value={value}></input>
        <h6>Recipient Email</h6>
        <input type="text" width="200" id="recipient" onChange={handleTextChange2} value={recipientEmail}></input>
        <button type="submit" disabled={ value ?false:true} className="btn btn-light" onClick={handleTransfer}>Transfer</button>
        </>
        ) : ("Please Log In")) : ( "Success! Balance: $" + user.balance)}
      
    />    
    )
  }