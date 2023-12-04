

export function seConnecter() {
    const seConnecter = document.querySelector(".formulaire");
    seConnecter.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const user =  {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value,
        };
        const chargeUtile = JSON.stringify(user);
        fetch('http://localhost:5678/api/users/login', {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: chargeUtile,
        })
    });
    
}