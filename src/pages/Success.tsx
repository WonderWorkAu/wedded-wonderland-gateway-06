
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const Success = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const plan = searchParams.get('plan') || 'your plan';
  const type = searchParams.get('type') || 'vendor';

  return (
    <div className="min-h-screen bg-wedding-cream/30 flex flex-col items-center justify-center px-4">
      <div className="bg-white rounded-xl p-8 shadow-xl max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-20 w-20 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-wedding-deep-purple mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-700 mb-6">
          Thank you for joining the Wedded Network with the <span className="font-semibold">{plan}</span> {type} plan. 
          We're thrilled to have you as part of our community!
        </p>
        <p className="text-sm text-gray-600 mb-8">
          You'll receive a confirmation email with more details about your membership shortly.
        </p>
        <Button 
          onClick={() => navigate('/')}
          className="gold-button w-full py-6"
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default Success;
