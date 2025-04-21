import { APIGatewayProxyResult } from 'aws-lambda';
export declare const buildResponse: (statusCode: number, body: Object) => APIGatewayProxyResult;
export declare const parseInput: (body: string) => Object;
