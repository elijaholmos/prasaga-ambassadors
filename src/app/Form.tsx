'use client';

import emailjs from '@emailjs/browser'
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
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
		console.log(values);
		emailjs.init({
			publicKey: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY,
			limitRate: {
				id: "vercel",
				throttle: 5000,
			},
		});

		emailjs.send("service_h6lo7jb", "template_voccwdi", values);
	}


	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-[#FDFDFD] px-4">
			<div className="mb-8 text-center">
				<Image
					src="/PrasagaLogoFull.svg"
					alt="PraSaga Logo"
					className="mx-auto mb-4 h-32 w-auto"
					width={64}
					height={64}
				/>
				<h1 className="text-3xl font-bold text-[#A646A1]">PraSaga Ambassadors Form</h1>
				<p className="mt-2 text-black">
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
								<FormLabel className="text-[#A646A1]">First Name</FormLabel>
								<FormControl>
									<Input placeholder="John" className="text-black" {...field} />
								</FormControl>
								<FormMessage className="text-black" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-[#A646A1]">Last Name</FormLabel>
								<FormControl>
									<Input placeholder="Doe" className="text-black" {...field} />
								</FormControl>
								<FormMessage className="text-black" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-[#A646A1]">Email</FormLabel>
								<FormControl>
									<Input placeholder="john.doe@example.com" className="text-black" {...field} />
								</FormControl>
								<FormMessage className="text-black" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="skills"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-[#A646A1]">Skills</FormLabel>
								<FormControl>
									<textarea
										placeholder="List your skills here..."
										className="w-full rounded-md border px-3 py-2 text-black bg-white"
										{...field}
									/>
								</FormControl>
								<FormMessage className="text-black" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="experience"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-[#A646A1]">Experience</FormLabel>
								<FormControl>
									<textarea
										placeholder="Describe your experience here..."
										className="w-full rounded-md border px-3 py-2 text-black bg-white"
										{...field}
									/>
								</FormControl>
								<FormMessage className="text-black" />
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
