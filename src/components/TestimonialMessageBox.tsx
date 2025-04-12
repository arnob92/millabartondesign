'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface TestimonialProps {
  name: string;
  text: string;
  date: string;
  image: string;
}

const TestimonialMessageBox: React.FC<TestimonialProps> = ({ name, text, date, image }) => {
  return (
    <div className="flex items-start">
      <img
        src={image}
        alt={name}
        className="w-16 h-16 rounded-full object-cover mr-4"
      />
      <div className="relative">
        <div className="absolute left-[-10px] top-4 w-0 h-0 border-l-10 border-l-transparent border-b-10 border-b-white border-t-10 border-t-transparent"></div>
        <Card className="rounded-lg shadow-md p-4 bg-white">
          <CardContent>
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <h4 className="font-medium ml-2">{name}</h4>
            </div>
            <p className="text-gray-700 text-lg">{text}</p>
            <p className="text-gray-500 text-sm">{date}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestimonialMessageBox;
