import { NextRequest } from "next/server";
import { jwtVerify } from "jose";
export default async function getLoggedInUserId(req:NextRequest){
const token=req.cookies.get("jwt")?.value
if(token){
    const verifiedToken=await token && jwtVerify(token,new TextEncoder().encode("$ecrete_sign"))
    if(verifiedToken){
        const token=await verifiedToken
        const id=token.payload.id
        return id
    }

}
}