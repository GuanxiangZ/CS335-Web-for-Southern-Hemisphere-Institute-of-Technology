window.onload = function(){
    window.username = null;
    window.password = null;

    function closeall(){
        document.getElementById("homepage").style.display = 'none';
        document.getElementById("staff").style.display = "none";
        document.getElementById("shop").style.display = "none";
        document.getElementById("registration").style.display = "none";
        document.getElementById("signin").style.display = "none";
        document.getElementById("guestbook").style.display = "none";
    }

    closeall();
    document.getElementById("homepage").style.display = 'block';

    document.getElementById("homebtn").onclick = function(){
        closeall();
        document.getElementById("homepage").style.display = 'block';
    }

    document.getElementById("staffbtn").onclick = function(){
        closeall();
        document.getElementById("staff").style.display = "block";

    }

    document.getElementById("shopbtn").onclick = function(){
        closeall();
        document.getElementById("shop").style.display = "block";
        shoplist.innerHTML = '';
            const items = fetch('http://localhost:5000/api/GetItems',{
                    headers : {
                        "Accept" : "application/json",
                        'Content-Type': "application/json",
                    }
                }
            );
            const item_json = items.then(res => res.json());
            item_json.then(data => {
                for (let n = 0; n< data.length;n++){
                    //addItem(data[i]);
                    const div = document.createElement('div');
                    const leftdiv = document.createElement('div');
                    leftdiv.style.display = "flex";
                    div.style.margin = "60px 60px";
                    const img = document.createElement('img');
                    img.setAttribute('src', 'http://localhost:5000/api/GetItemPhoto/' + data[n].id);
                    img.setAttribute('style','width:200px');
                    img.style.float = "left";

                    const detaildiv = document.createElement('div');

                    const Name = document.createElement('p');
                    Name.innerHTML = "Name : "+data[n].name;

                    const Desci = document.createElement('p');
                    Desci.innerHTML = 'Description : '+data[n].description;

                    const price = document.createElement('p');
                    price.innerHTML = "Price : " + data[n].price;

                    const buybtn = document.createElement('button');
                    buybtn.onclick = function(){
                        if (window.username == null) {
                            alert("Please Login!")
                            closeall();
                            document.getElementById("signin").style.display = "block";
                        }
                    };
                    buybtn.innerHTML = 'Buy';
                    buybtn.style.border = "none";
                    buybtn.style.cursor = "pointer";
                    buybtn.style.width = "150px";
                    buybtn.style.height = "40px";
                    buybtn.style.margin = "30px 30px";
                    

                    detaildiv.appendChild(Name);
                    detaildiv.appendChild(Desci);
                    detaildiv.appendChild(price);
                    detaildiv.appendChild(Name);

                    detaildiv.style.margin = "60px";


                    leftdiv.appendChild(img);
                    leftdiv.appendChild(detaildiv);
                    div.appendChild(leftdiv);
                    div.appendChild(buybtn);
                    shoplist.appendChild(div);
                }
            })
    }

    document.getElementById("regbtn").onclick = function(){
        closeall();
        document.getElementById("registration").style.display = "block";
    }

    document.getElementById("guestbtn").onclick = function(){
        closeall();
        document.getElementById("guestbook").style.display = "block";
    }

    document.getElementById("signinbtn").onclick = function(){
        closeall();
        document.getElementById("signin").style.display = "block";
    }

    document.getElementById("regbtn-in_login").onclick = function(){
        closeall();
        document.getElementById("registration").style.display = "block";
    }

    document.getElementById("smalllogin").onclick = function(){
        closeall();
        document.getElementById("signin").style.display = "block";
    }



    //Comment
    document.getElementById("submitbtn").onclick = function(){
        const commentcontext = document.querySelector("#comment");
        const commentuser = document.querySelector("#commentuser");
        if (commentcontext.value == ""){
            alert("Please enter comment.")
        }
        else if (commentuser.value == "") {
            alert("Please enter username.")
        }
        else {
            const post = fetch( "http://localhost:5000/api/WriteComment" , {
                headers:{
                    "Accept" : "application/json",
                    "Content-Type" : "application/json"
                },
                method:"POST",
                body:JSON.stringify({
                    "Name" : commentuser.value,
                    "Comment" : commentcontext.value
                })

            });
            post.then(e => {
                const commentlist = document.querySelector("#commentcontext");
                commentlist.setAttribute('src', 'http://localhost:5000/api/GetComments')
            });
        }
    }

    //Regi
    document.getElementById("signupsub").onclick = function(){
        const username = commentcontext = document.querySelector("#signupusername");
        const password = commentcontext = document.querySelector("#signuppassword");
        const address = commentcontext = document.querySelector("#signupaddress");
        if (username.value == '') {
            alert("Please enter username")
        }
        else if (password.value == '') {
            alert("Please enter password")
        }
        else {
            const regi = fetch( "http://localhost:5000/api/Register" , {
                headers:{
                    "Accept" : "application/json",
                    "Content-Type" : "application/json"
                },
                method:"POST",
                body:JSON.stringify({
                    "UserName" : username.value,
                    "PassWord" : password.value,
                    "Address" : address.value
                })

            });
            const alreat_text = regi.then(e => e.text());
            alreat_text.then(
                text => alert(text)
            );
        }
    }


    //Login
    document.getElementById("loginsub").onclick = function(){
        const username = document.querySelector("#loginusername");
        const password = document.querySelector("#loginpassword");
        if (username.value == '') {
            alert("Please enter your username")
        }
        else if (password.value == '') {
            alert("Please enter your password")
        }
        else{
            const login = fetch( "http://localhost:5000/api/GetversionA" , {
                headers:{
                    "Accept" : "application/json",
                    "Content-Type" : "application/json",
                    "Authorization" : "Basic " + window.btoa(username.value + ":" + password.value)
                }
            });
            login.then(
                e =>{
                    if (e.status == 200){
                        alert("Successful login.")
                        window.username = username.value;
                        window.password = password.value;
                        const showusername = document.querySelector("#showusername");
                        document.getElementById("smalllogin").style.display = "none";
                        document.getElementById("smalllogout").style.display = "block";
                        showusername.innerHTML = window.username;
                        closeall();
                        document.getElementById("homepage").style.display = 'block';

                    }
                    else{
                        alert("The username and password you entered do not match any active accounts.")
                    }
                }
            )
        }
    }

    //Logout
    document.getElementById("smalllogout").onclick = function(){
        window.username = null;
        window.password = null;
        document.querySelector("#showusername").innerHTML = "Please Login";
        document.getElementById("smalllogin").style.display = "block";
        document.getElementById("smalllogout").style.display = "none";
    }

    //Shop
    const shoplist = document.querySelector('.shoplist');
    document.querySelector('#searchitem').oninput = function (){
        if(this.value == ''){
            shoplist.innerHTML = '';
            const items = fetch('http://localhost:5000/api/GetItems',{
                    headers : {
                        "Accept" : "application/json",
                        'Content-Type': "application/json",
                    }
                }
            );
            const item_json = items.then(res => res.json());
            item_json.then(data => {
                for (let n = 0; n< data.length;n++){
                    //addItem(data[i]);
                    const div = document.createElement('div');
                    const leftdiv = document.createElement('div');
                    leftdiv.style.display = "flex";
                    div.style.margin = "60px 60px";
                    const img = document.createElement('img');
                    img.setAttribute('src', 'http://localhost:5000/api/GetItemPhoto/' + data[n].id);
                    img.setAttribute('style','width:200px');
                    img.style.float = "left";

                    const detaildiv = document.createElement('div');

                    const Name = document.createElement('p');
                    Name.innerHTML = "Name : "+data[n].name;

                    const Desci = document.createElement('p');
                    Desci.innerHTML = 'Description : '+data[n].description;

                    const price = document.createElement('p');
                    price.innerHTML = "Price : " + data[n].price;

                    const buybtn = document.createElement('button');
                    buybtn.onclick = function(){
                        if (window.username == null) {
                            alert("Please Login!")
                            closeall();
                            document.getElementById("signin").style.display = "block";
                        }
                    };
                    buybtn.innerHTML = 'Buy';
                    buybtn.style.border = "none";
                    buybtn.style.cursor = "pointer";
                    buybtn.style.width = "150px";
                    buybtn.style.height = "40px";
                    buybtn.style.margin = "30px 30px";
                    

                    detaildiv.appendChild(Name);
                    detaildiv.appendChild(Desci);
                    detaildiv.appendChild(price);
                    detaildiv.appendChild(Name);

                    detaildiv.style.margin = "60px";


                    leftdiv.appendChild(img);
                    leftdiv.appendChild(detaildiv);
                    div.appendChild(leftdiv);
                    div.appendChild(buybtn);
                    shoplist.appendChild(div);
                }
            })
        }else{
            shoplist.innerHTML = '';
            const items = fetch('http://localhost:5000/api/GetItems/'+ this.value,{
                    headers:{
                        "Accept" : "application/json",
                        'Content-Type': "application/json",
                    }
                }
            );
            const item_json = items.then(res => res.json());
            item_json.then(data => {
                for (let n = 0; n< data.length;n++){
                    //addItem(data[i]);
                    const div = document.createElement('div');
                    const leftdiv = document.createElement('div');
                    leftdiv.style.display = "flex";
                    div.style.margin = "60px 60px";
                    const img = document.createElement('img');
                    img.setAttribute('src', 'http://localhost:5000/api/GetItemPhoto/' + data[n].id);
                    img.setAttribute('style','width:200px');
                    img.style.float = "left";

                    const detaildiv = document.createElement('div');

                    const Name = document.createElement('p');
                    Name.innerHTML = "Name : "+data[n].name;

                    const Desci = document.createElement('p');
                    Desci.innerHTML = 'Description : '+data[n].description;

                    const price = document.createElement('p');
                    price.innerHTML = "Price : " + data[n].price;

                    const buybtn = document.createElement('button');
                    buybtn.onclick = function(){
                        if (window.username == null) {
                            alert("Please Login!")
                            closeall();
                            document.getElementById("signin").style.display = "block";
                        }
                    };
                    buybtn.innerHTML = 'Buy';
                    buybtn.style.border = "none";
                    buybtn.style.cursor = "pointer";
                    buybtn.style.width = "150px";
                    buybtn.style.height = "40px";
                    buybtn.style.margin = "30px 30px";
                    

                    detaildiv.appendChild(Name);
                    detaildiv.appendChild(Desci);
                    detaildiv.appendChild(price);
                    detaildiv.appendChild(Name);

                    detaildiv.style.margin = "60px";


                    leftdiv.appendChild(img);
                    leftdiv.appendChild(detaildiv);
                    div.appendChild(leftdiv);
                    div.appendChild(buybtn);
                    shoplist.appendChild(div);
                }
            })



        }
    }


    //items();

}


function itemsByName(Name){
    const xx = fetch('http://localhost:5000/api/GetItems/'+ Name,{
            headers:{
                "Accept" : "application/json",
                'Content-Type': "application/json",
            }
        }
    );
    const xx2 = xx.then(res => res.json());
    xx2.then(data => {
        for (let i = 0; i< data.length;i++){
            addItem(data[i]);
        }
    })
}