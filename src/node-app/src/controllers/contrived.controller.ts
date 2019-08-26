import {Controller, Get} from '@nestjs/common';
import {JobPusherService} from "../job.pusher.service";
import {Ping} from "../jobs/Ping";

@Controller('/')
export class ContrivedController {

    constructor(
        private readonly  jobPusherService: JobPusherService
    ) {
    }

    @Get('/contrived')
    async contrived() {
        await this.jobPusherService.send(new Ping("Hello from node!!!!"));
    }

}
