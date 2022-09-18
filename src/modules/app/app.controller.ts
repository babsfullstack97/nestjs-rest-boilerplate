import {
    Controller,
    Get,
    HttpCode,
    Res,
    UseInterceptors,
} from '@nestjs/common';

import { CacheInterceptor } from '@nestjs/common';

import type { Response } from 'express';

import { StatusService } from '@modules/status/status.service';

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
    constructor(private readonly statusService: StatusService) {}

    @Get('/')
    @HttpCode(302)
    index(@Res() res: Response) {
        res.redirect('/status');
    }
    @Get('/status')
    @HttpCode(200)
    status() {
        return this.statusService.show();
    }
}
