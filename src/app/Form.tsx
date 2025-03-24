'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
	firstName: z.string().nonempty({ message: 'First name is required.' }),
	lastName: z.string().nonempty({ message: 'Last name is required.' }),
	email: z.string().email({ message: 'Invalid email address.' }),
	skills: z.string().nonempty({ message: 'Skills are required.' }),
	experience: z.string().nonempty({ message: 'Experience is required.' }),
});

export function ProfileForm() {
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			skills: '',
			experience: '',
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4">
			<div className="mb-8 text-center">
				<h1 className="text-3xl font-bold text-[#A646A1]">PraSaga Ambassadors Form</h1>
				<p className="mt-2 text-gray-600">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. PraSaga is looking for passionate
					ambassadors to join our mission.
				</p>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-md"
				>
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input placeholder="John" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input placeholder="Doe" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="john.doe@example.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="skills"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Skills</FormLabel>
								<FormControl>
									<textarea
										placeholder="List your skills here..."
										className="w-full rounded-md border px-3 py-2"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="experience"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Experience</FormLabel>
								<FormControl>
									<textarea
										placeholder="Describe your experience here..."
										className="w-full rounded-md border px-3 py-2"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="w-full bg-[#A646A1] text-white hover:bg-purple-700">
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
}
