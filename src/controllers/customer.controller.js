exports.getMessage = async () => {
  const response = await fetch(
      `https://jewelly-f94d514b961f.herokuapp.com/api/v1/customer-message`)
  return await response.json()
}

exports.postMessage = async (body) => {

  // const cusHeaders =  {
  //   // "Accept": "application/json",
  //   "Content-Type": "application/json"
  // };
  //
  // const settings = {
  //   method: "PUT",
  //   headers: cusHeaders,
  //   body: JSON.stringify(data),
  // };

  try {
    const response = await fetch(
        "https://jewelly-f94d514b961f.herokuapp.com/api/v1/customer-message",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json; charset=UTF-8" },
          body: JSON.stringify(body),
        })
    return await response.json()
  } catch (e) {
    return e;
  }
}

// exports.postMessage = async (customerName, customerEmail, subject, message) => {
//   // const rawResponse = await fetch(`https://jewelly-f94d514b961f.herokuapp.com/api/v1/customer-message`, {
//   //   method: 'POST', headers: {
//   //     'Accept': 'application/json', 'Content-Type': 'application/json'
//   //   }, body: JSON.stringify({data: })
//   // });
//   // return  await rawResponse.json()
//
//   fetch(`https://jewelly-f94d514b961f.herokuapp.com/api/v1/customer-message`, {
//     method: 'POST',
//     body: JSON.stringify({
//       customerName: customerName,
//       customerEmail: customerEmail,
//       subject: subject,
//       message: message,
//     }),
//     headers: {'Content-Type': 'application/json'}
//   }).then(res => res.json())
//   .then(json => console.log(json));
// }