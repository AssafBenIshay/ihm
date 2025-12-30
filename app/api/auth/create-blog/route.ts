import { NextResponse } from 'next/server';

export async function POST() {
    console.log("Hello from server using server acti0ons NEXT");

    return NextResponse.json({ success: true });
}