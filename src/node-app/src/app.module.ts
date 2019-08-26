import {Module} from '@nestjs/common';
import {ContrivedController} from './controllers/contrived.controller';
import {JobPusherService} from "./job.pusher.service";

@Module({
    imports: [

    ],
    controllers: [
        ContrivedController,

    ],
    providers: [
        JobPusherService
    ],
})
export class AppModule {
}
