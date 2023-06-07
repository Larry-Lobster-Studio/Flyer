import { config } from '@/config/main.config';
import { MeiliSearch } from 'meilisearch';

const meiliSearch = new MeiliSearch({ host: config.meili.host });

export default meiliSearch;
