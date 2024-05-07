import { SetMetadata } from '@nestjs/common';
import { MetadataKey } from 'src/constants/enum';

export const Public = () => SetMetadata(MetadataKey.IS_PUBLIC, true);
