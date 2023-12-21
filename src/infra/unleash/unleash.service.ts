import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { destroy, startUnleash, Unleash } from 'unleash-client';
import { GlobalConfig, UnleashParams } from '../../config/setting.model';

type CoreToggleDefinition = `pichanga-${string}`;
@Injectable()
export class UnleashService implements OnModuleInit, OnModuleDestroy {
  private unleash: Unleash;

  constructor(readonly config: ConfigService<GlobalConfig>) {}

  async onModuleInit(): Promise<void> {
    this.unleash = await startUnleash({
      appName: 'defaulf',
      url: this.getUrl(),
      customHeaders: {
        Authorization: this.getToken(),
      },
    });
  }

  private getToken(): string {
    return this.config.get<UnleashParams>('unleash').apiToken;
  }

  private getUrl(): string {
    return this.config.get<UnleashParams>('unleash').apiUrl;
  }

  isEnabled(name: CoreToggleDefinition): boolean {
    // const unleashContext: Context = {
    //   userId: idAccount,
    // };
    return this.unleash.isEnabled(name);
  }

  getVariant(name: string): string | undefined {
    // const unleashContext: Context = {
    //   userId: idYapeAccount,
    // };
    return this.unleash.getVariant(name).payload?.value;
  }

  onModuleDestroy() {
    destroy();
  }
}
