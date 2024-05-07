import { SetMetadata } from '@nestjs/common';
import { MetadataKey } from 'src/constants/enum';

export const ResponseMessage = (message: string) => SetMetadata(MetadataKey.RESPONSE_MESSAGE, message);
