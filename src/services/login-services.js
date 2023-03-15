import {FacebookAuthProvider, getAdditionalUserInfo, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {addDocument, generateKeywords} from "../firebase/services";
import {auth} from "../firebase/config";


const fbProvider = new FacebookAuthProvider()
const ggProvider = new GoogleAuthProvider()

const AddUser = async (result) => {
    const additionalUserInfo = await getAdditionalUserInfo(result)
    if(additionalUserInfo?.isNewUser){
        return await addDocument("users", {
            displayName: result?.user.displayName,
            email: result?.user.email,
            photoURL: result?.user.photoURL,
            uid: result?.user.uid,
            provider: result?.providerId,
            keywords: generateKeywords(result?.user.displayName?.toLowerCase())
        } )
    }
    return additionalUserInfo
}
export const LoginServices = async (type) => {
    if (type === "google"){
        const result =  await signInWithPopup(auth, ggProvider)
        await AddUser(result)
    }else {
        const result =  await signInWithPopup(auth, fbProvider)
        await AddUser(result)
    }
}
