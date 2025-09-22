import { NextResponse } from 'next/server';
import axios from 'axios';
import crypto from 'crypto';

const DELTA_API_KEY = process.env.DELTA_API_KEY!;
const DELTA_API_SECRET = process.env.DELTA_API_SECRET!;

export async function GET() {
  try {
    const timestamp = Date.now();
    const method = 'GET';
    const path = '/api/v2/market/tickers'; // example endpoint
    const body = ''; // GET request has empty body
    const message = `${timestamp}${method}${path}${body}`;

    // HMAC SHA256 signature
    const signature = crypto
      .createHmac('sha256', DELTA_API_SECRET)
      .update(message)
      .digest('hex');

    // const response = await axios.get(`https://api.delta.exchange${path}`, {
    //   headers: {
    //     'X-Delta-API-Key': DELTA_API_KEY,
    //     'X-Delta-Signature': signature,
    //     'X-Delta-Timestamp': timestamp.toString(),
    //   },
    // });
    const response = await axios.get("https://api.india.delta.exchange/v2/indices");

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
