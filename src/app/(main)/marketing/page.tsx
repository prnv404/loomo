
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sparkles, Copy } from 'lucide-react';
import { generateSmsAction } from './actions';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  customerSegment: z.string().min(1, 'Please select a customer segment.'),
  newArrivals: z.string().min(5, 'Please describe the new arrivals.'),
  offerDetails: z.string().min(5, 'Please provide details about the offer.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function MarketingPage() {
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerSegment: '',
      newArrivals: '',
      offerDetails: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setGeneratedMessage('');
    const result = await generateSmsAction(values);
    setIsLoading(false);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    } else if (result.data) {
      setGeneratedMessage(result.data.smsMessage);
    }
  }
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedMessage);
    toast({
        title: 'Copied!',
        description: 'Marketing message copied to clipboard.',
    });
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Marketing Message Generator</CardTitle>
          <CardDescription>
            Use AI to craft the perfect marketing message for SMS or WhatsApp.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="customerSegment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Segment</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a segment to target" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="frequent buyers">
                          Frequent Buyers
                        </SelectItem>
                        <SelectItem value="high-value buyers">
                          High-Value Buyers
                        </SelectItem>
                        <SelectItem value="new customers">
                          New Customers
                        </SelectItem>
                         <SelectItem value="all customers">
                          All Customers
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newArrivals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Arrivals</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Italian leather shoes, summer linen collection"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe the new products you want to promote.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="offerDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Offer Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 20% off, free shipping, exclusive preview"
                        {...field}
                      />
                    </FormControl>
                     <FormDescription>
                      Provide the specific details of your announcement or offer.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                <Sparkles className="mr-2 h-4 w-4" />
                {isLoading ? 'Generating...' : 'Generate Message'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generated Message</CardTitle>
          <CardDescription>
            Review the AI-generated message below.
          </CardDescription>
        </CardHeader>
        <CardContent className="relative">
            <Textarea
                readOnly
                value={generatedMessage}
                placeholder="Your generated SMS will appear here..."
                className="h-64 resize-none"
            />
            {generatedMessage && (
                 <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                </Button>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
