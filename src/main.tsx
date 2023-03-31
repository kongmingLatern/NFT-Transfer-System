import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import ReactDOM from 'react-dom/client';
import '@/assets/index.css';
import '@/assets/global.css';
import '@/component/paint/i18n';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { MessageList } from './component/common/message/Message';
import { start } from '@/micro';

// console.log(start);
// start();
start({
	sandbox: {
		experimentalStyleIsolation: true
	}
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<ChakraProvider>
		<RouterProvider router={router} />
	</ChakraProvider>
);

// 在加载 JS 时在页面上挂载消息 model
const messageModelContainer = document.createElement('div');
messageModelContainer.className = 'message-model-container';
document.body.appendChild(messageModelContainer);

ReactDOM.createRoot(messageModelContainer as HTMLElement).render(
	<MessageList></MessageList>
);
