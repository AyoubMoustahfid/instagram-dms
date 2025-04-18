import React from 'react'
import {
    ClerkLoading,
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton
} from "@clerk/nextjs"
import { User2 } from "lucide-react"
import Loader from '../loader'
import { Button } from '@/components/ui/button'


type Props = {}

const ClerkAuthState = (props: Props) => {
    return (
        <>
            <ClerkLoading>
                <Loader state>
                    <></>
                </Loader>
                <ClerkLoading/>
                <SignedOut>
                    <SignInButton>
                        <Button 
                            className="rounded-xl bg-[#252525] text-white hover:bg-[#252525]/70"
                        >
                            <User2/>
                            Login
                        </Button>
                    </SignInButton>
                </SignedOut>
            </ClerkLoading>
            <SignedIn>
                <UserButton>
                    <UserButton.UserProfileLink
                        label="Dashboard"
                        url={`/dashboard`}
                        labelIcon={<User2 size={16}/>}
                    />
                </UserButton>
            </SignedIn>
        </>
    )

}

export default ClerkAuthState