import { Module } from '@nestjs/common';
import { UserService } from '../modules/users/services/user.service';

@Module({
    providers:[UserService],
    exports:[UserService]
})
export class ShareServiceModule {}
