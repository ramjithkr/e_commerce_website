


//user & admin login functions

export const loginFunction = (email,password)=>{
    if (!email || !password) {
        return res
          .status(400)
          .json({ success: false, message: "all fields required" });
      }
}

// checking the user is existing
export const userExistsFnc = (userExists)=>{

}