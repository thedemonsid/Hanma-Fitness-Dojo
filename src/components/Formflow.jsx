import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import GymQuestionnaireCarousel from '@/components/onboardform';
import DietQuestionnaireCarousel from '@/components/Diet_info_form';
import WorkoutQuestionnaireCarousel from '@/components/workout_info_form';

export default function FormFlow() {
  const [step, setStep] = useState(1);
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    onboard: null,
    dietInfo: null,
    workoutInfo: null
  });
  const { toast } = useToast();
  const router = useRouter();

  const handleFormChange = (formName, data) => {
    setFormData(prevData => ({
      ...prevData,
      [formName]: data
    }));
  };

  const handleNextForm = () => {
    if (step < 3) {
      setStep(prevStep => prevStep + 1);
      toast({
        title: "Form Saved",
        description: `Form ${step} has been saved. Moving to the next form.`,
      });
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    console.log('Submitting all forms:', formData);
    toast({
      title: "Forms Submitted",
      description: "All form data has been saved successfully.",
    });
    setShowDialog(true);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    router.push('/Dashboard');
  };

  const getCurrentForm = () => {
    switch (step) {
      case 1:
        return <GymQuestionnaireCarousel plan="pro" onChange={(data) => handleFormChange('onboard', data)} />;
      case 2:
        return <DietQuestionnaireCarousel plan="pro" onChange={(data) => handleFormChange('dietInfo', data)} />;
      case 3:
        return <WorkoutQuestionnaireCarousel plan="pro" onChange={(data) => handleFormChange('workoutInfo', data)} />;
      default:
        return null;
    }
  };

  const isCurrentFormValid = () => {
    switch (step) {
      case 1:
        return formData.onboard !== null;
      case 2:
        return formData.dietInfo !== null;
      case 3:
        return formData.workoutInfo !== null;
      default:
        return false;
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Form {step} of 3</h1>
      {getCurrentForm()}
      <div className="mt-4">
        <Button 
          onClick={handleNextForm} 
          disabled={!isCurrentFormValid()}
        >
          {step < 3 ? "Next Form" : "Submit All Forms"}
        </Button>
      </div>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Forms Submitted Successfully</DialogTitle>
            <DialogDescription>
              All forms have been completed. You will be redirected to the dashboard.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleDialogClose}>Go to Dashboard</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}