"use server"

import prisma from "../lib/db";

export default async function createUser(formData: FormData) {
    const gmail = formData.get("gmail") as string;
    const password = formData.get("password") as string;

    console.log("ola mundo")

    try {
        await prisma.goo_users.create({
            data: {
                created_at: new Date(Date.now()),
                email: gmail,
                password
            }
        });
    }
    catch (err) {
        console.log((err as Error).message);
    }
}