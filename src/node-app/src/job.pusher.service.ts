import {Injectable} from "@nestjs/common";
import uuid4 from "uuid/v4";
import {IJob} from "./interfaces/job.interface";
import amqp from "amqplib";

@Injectable()
export class JobPusherService {
    readonly CONNECT = 'amqp://rabbit:rabbit@rabbitmq:5672';

    async send(job: IJob) {
        const server = await amqp.connect(this.CONNECT);
        const channel = await server.createChannel();

        const jobExecuting = job.JOB;

        delete job.JOB;

        channel.sendToQueue(
            'contrived_queue',
            Buffer.from(
                JSON.stringify(job)
            ),
            {
                headers: {
                    "rr-id": uuid4(),
                    "rr-job": jobExecuting,
                    "rr-attempt": 1000_000_000_000,
                    "rr-maxAttempts": 1000_000_000_000,
                    "rr-timeout": 1000_000_000_000,
                    "rr-delay": 1000_000_000_000,
                    "rr-retryDelay": 1000_000_000_000,
                }
            }
        );
    }
}