import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  try {
    const response = await axios.get('https://api.india.delta.exchange/v2/products', {
      headers: {
        'Accept': 'application/json'
      },
      params: {} // add query params if needed
    });

    return NextResponse.json(response.data); // send JSON back to client
  } catch (error: any) {
    console.error('Error fetching products:', error.response?.data || error.message);
    return NextResponse.json({ success: false, error: error.response?.data || error.message }, { status: 500 });
  }
}
