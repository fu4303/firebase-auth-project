

// listen for auth status changes
auth.onAuthStateChanged(user =>{
    if(user){ 

        db.collection('guides').onSnapshot(snapshot =>{
            setupGuides(snapshot.docs);
            setupUI(user);
        }, err =>{console.log(err.message)});

    }else{
        setupGuides([]);
        setupUI();
    }
});

//create guide content

const creteForm = document.querySelector('#create-form');

creteForm.addEventListener('submit', e =>{
    e.preventDefault();

    db.collection('guides').add({
        title: creteForm.title.value,
        content: creteForm.content.value
    }).then(()=>{
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        creteForm.reset();
    }).catch(err => console.log(err.message));

})

//sign up
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
  
    // sign up the user & add firestore data
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        // close the signup modal & reset form
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
  });

//logout
const logout = document.querySelector('#logout');

logout.addEventListener('click', (e) =>{
    e.preventDefault();
    auth.signOut();
});

//login
const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', e =>{
    e.preventDefault();

    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred =>{
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        signUpForm.reset();
    })
})