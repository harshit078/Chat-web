import { motion } from 'framer-motion';

const Message = ({ message, username }) => {
    const isOwner = message.sender === username;

    return (
        <motion.div 
            className="flex gap-2 flex-col text-gray-800  dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <span className="text-xs text-center text-gray-500 dark:text-gray-400">{new Date(message.createdAt).toLocaleString()}</span>
            <div className={`flex gap-2 items-center ${isOwner ? 'flex-row-reverse' : 'flex-row'}`}>
                <small className={`w-10 h-10 rounded-full   flex items-center justify-center text-lg font-semibold ${isOwner ? 'bg-gradient-to-r from-green-500  to-green-700 ' : 'bg-gradient-to-r from-blue-600 to-blue-700'}`}>
                    {message.sender.substr(0, 1).toUpperCase()}
                </small>
                <span className={`rounded-lg p-3 max-w-xs lg:max-w-md break-words ${isOwner ? 'bg-gradient-to-r from-green-500  to-green-700' : 'bg-gradient-to-r from-blue-600 to-blue-700'} text-white shadow-md`}>
                    {message.content}
                </span>
            </div>
        </motion.div>
    )
}

export default Message;
