import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('https://api.india.delta.exchange/v2/indices', {
      headers: {
        'Accept': 'application/json'
      },
      params: {
        // add query parameters here if needed
      }
    });

    const data = await response.data;
    console.log(data);

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to fetch indices' }, { status: 500 });
  }
}
