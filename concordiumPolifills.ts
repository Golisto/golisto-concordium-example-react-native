// import "@stardazed/streams-polyfill"; // needed only for GRPC client and breaks all fetch
import "@azure/core-asynciterator-polyfill";

import { polyfill as polyfillEncoding } from "react-native-polyfill-globals/src/encoding"; // Requires peer dependency `text-encoding`
import { polyfill as polyfillCrypto } from "react-native-polyfill-globals/src/crypto"; // Requires peer dependency `react-native-get-random-values`

polyfillEncoding();
polyfillCrypto();
