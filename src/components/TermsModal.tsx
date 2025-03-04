
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface TermsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Terms & Conditions</DialogTitle>
          <DialogDescription className="pt-2">
            Last updated: {new Date().toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4 text-sm text-gray-600">
          <h3 className="text-lg font-semibold text-black">1. Introduction</h3>
          <p>
            Welcome to ZeroVacancy. These Terms & Conditions govern your use of our website and services. 
            By accessing or using our services, you agree to be bound by these Terms.
          </p>
          
          <h3 className="text-lg font-semibold text-black">2. Services</h3>
          <p>
            ZeroVacancy provides a platform connecting property owners with content creators. We do not directly 
            provide content creation services, but rather facilitate connections between parties.
          </p>
          
          <h3 className="text-lg font-semibold text-black">3. User Accounts</h3>
          <p>
            When you create an account with ZeroVacancy, you must provide accurate and complete information.
            You are responsible for maintaining the security of your account and password.
          </p>
          
          <h3 className="text-lg font-semibold text-black">4. Payment Terms</h3>
          <p>
            Payment terms are specified at the time of service booking. All payments are processed securely 
            through our payment processors. Refunds are subject to our Refund Policy.
          </p>
          
          <h3 className="text-lg font-semibold text-black">5. Privacy</h3>
          <p>
            Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your 
            personal information when you use our services.
          </p>
          
          <h3 className="text-lg font-semibold text-black">6. Limitation of Liability</h3>
          <p>
            ZeroVacancy is not liable for any damages arising from your use of our services. We do not guarantee 
            the quality or accuracy of content created by third-party creators.
          </p>
          
          <h3 className="text-lg font-semibold text-black">7. Changes to Terms</h3>
          <p>
            We reserve the right to modify these Terms at any time. We will provide notice of significant changes 
            through our website or other communication methods.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TermsModal;
