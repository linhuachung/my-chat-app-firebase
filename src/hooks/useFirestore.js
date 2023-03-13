import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy, where } from "firebase/firestore";
import { db } from "../firebase/config";

export const useFirestore = (collections, condition) => {
    const [documents, setDocuments] = useState([])
    useEffect(() => {
        let collectionsRef = query(collection(db, collections), orderBy('createdAt'))

        if(condition){
            if(!condition.compareValue || !condition.compareValue.length) return
            collectionsRef = query(collectionsRef, where(condition.fieldName, condition.operator, condition.compareValue))
        }

        const unSubscribe = onSnapshot(collectionsRef, (snapshot) => {
            const documents = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setDocuments(documents)
        })
        return unSubscribe
    }, [collections, condition])
    return documents
}
