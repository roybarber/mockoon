import * as Joi from 'joi';
import { PreMigrationSettings } from 'src/renderer/app/models/settings.model';
import { Config } from 'src/renderer/config';
import {
  EnvironmentDescriptor,
  FileWatcherOptions,
  Settings
} from 'src/shared/models/settings.model';

export const SettingsDefault: Settings = {
  welcomeShown: false,
  bannerDismissed: [],
  logSizeLimit: 10000,
  maxLogsPerEnvironment: Config.defaultMaxLogsPerEnvironment,
  truncateRouteName: true,
  mainMenuSize: Config.defaultMainMenuSize,
  secondaryMenuSize: Config.defaultSecondaryMenuSize,
  fakerLocale: 'en',
  fakerSeed: null,
  lastChangelog: Config.appVersion,
  environments: [],
  enableTelemetry: true,
  storagePrettyPrint: true,
  fileWatcherEnabled: FileWatcherOptions.DISABLED,
  dialogWorkingDir: '',
  startEnvironmentsOnLoad: false
};

export const SettingsSchema = Joi.object<Settings & PreMigrationSettings, true>(
  {
    welcomeShown: Joi.boolean()
      .failover(SettingsDefault.welcomeShown)
      .required(),
    bannerDismissed: Joi.array()
      .items(Joi.string(), Joi.any().strip())
      .failover(SettingsDefault.bannerDismissed)
      .required(),
    logSizeLimit: Joi.number()
      .min(1)
      .failover(SettingsDefault.logSizeLimit)
      .required(),
    maxLogsPerEnvironment: Joi.number()
      .min(1)
      .failover(SettingsDefault.maxLogsPerEnvironment)
      .required(),
    truncateRouteName: Joi.boolean()
      .failover(SettingsDefault.truncateRouteName)
      .required(),
    mainMenuSize: Joi.number()
      .min(Config.defaultMainMenuSize)
      .failover(SettingsDefault.mainMenuSize)
      .required(),
    secondaryMenuSize: Joi.number()
      .min(Config.defaultSecondaryMenuSize)
      .failover(SettingsDefault.secondaryMenuSize)
      .required(),
    fakerLocale: Joi.string().failover(SettingsDefault.fakerLocale).required(),
    fakerSeed: Joi.number()
      .allow(null)
      .failover(SettingsDefault.fakerSeed)
      .required(),
    lastChangelog: Joi.string()
      .failover(SettingsDefault.lastChangelog)
      .required(),
    environments: Joi.array()
      .items(
        Joi.object<EnvironmentDescriptor, true>({
          uuid: Joi.string().uuid().required(),
          path: Joi.string().required()
        }),
        Joi.any().strip()
      )
      .failover(SettingsDefault.environments)
      .required(),
    lastMigration: Joi.number().strip(),
    enableTelemetry: Joi.boolean()
      .failover(SettingsDefault.enableTelemetry)
      .required(),
    storagePrettyPrint: Joi.boolean()
      .failover(SettingsDefault.storagePrettyPrint)
      .required(),
    fileWatcherEnabled: Joi.string()
      .valid(
        FileWatcherOptions.DISABLED,
        FileWatcherOptions.PROMPT,
        FileWatcherOptions.AUTO
      )
      .failover(SettingsDefault.fileWatcherEnabled)
      .required(),
    dialogWorkingDir: Joi.string()
      .failover(SettingsDefault.dialogWorkingDir)
      .required(),
    startEnvironmentsOnLoad: Joi.boolean()
      .failover(SettingsDefault.startEnvironmentsOnLoad)
      .required()
  }
)
  .failover(SettingsDefault)
  .default(SettingsDefault)
  .options({ stripUnknown: true });
