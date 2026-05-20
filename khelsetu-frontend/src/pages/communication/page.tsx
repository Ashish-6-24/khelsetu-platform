import { Card, CardBody, CardHeader } from '@components/ui/Card';
import { Button } from '@components/ui/Button';
import { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  type: 'announcement' | 'chat' | 'system';
}

const mockMessages: Message[] = [
  { id: '1', sender: 'Admin', content: 'Tournament starts tomorrow at 10 AM', timestamp: '2024-01-15 09:00', type: 'announcement' },
  { id: '2', sender: 'Coach', content: 'Please submit team roster by Friday', timestamp: '2024-01-15 10:30', type: 'chat' },
  { id: '3', sender: 'System', content: 'Match #12 has been rescheduled', timestamp: '2024-01-15 11:00', type: 'system' },
];

export const CommunicationPage = () => {
  const [messages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Communication</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Messages, announcements, and team chat</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Messages</h3>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {messages.map((msg) => (
                  <div key={msg.id} className={`p-3 rounded-lg ${msg.type === 'announcement' ? 'bg-blue-50 dark:bg-blue-900/20' : msg.type === 'system' ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm text-gray-900 dark:text-white">{msg.sender}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{msg.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{msg.content}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                />
                <Button variant="primary"><Send className="w-4 h-4" /></Button>
              </div>
            </CardBody>
          </Card>
        </div>

        <Card>
          <CardHeader><h3 className="text-lg font-bold text-gray-900 dark:text-white">Quick Actions</h3></CardHeader>
          <CardBody>
            <div className="space-y-2">
              <Button variant="outline" className="w-full">Send Announcement</Button>
              <Button variant="outline" className="w-full">Create Group</Button>
              <Button variant="outline" className="w-full">View Inbox</Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
