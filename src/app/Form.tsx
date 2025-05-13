'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import emailjs from '@emailjs/browser';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
	firstName: z.string().nonempty({ message: 'First name is required.' }),
	lastName: z.string().nonempty({ message: 'Last name is required.' }),
	email: z.string().email({ message: 'Invalid email address.' }),
	countryRegion: z.string().nonempty({ message: 'Country/Region is required.' }),
	languagesSpoken: z.string().nonempty({ message: 'Languages spoken are required.' }),
	skills: z.string().nonempty({ message: 'Skills are required.' }),
	experience: z.string().nonempty({ message: 'Experience is required.' }),
	preferredContributionAreas: z
		.array(z.string())
		.nonempty({ message: 'Please select at least one contribution area.' }),
	socialMediaLinks: z.string().nonempty({ message: 'Social media links are required.' }),
	timeCommitment: z.string().nonempty({ message: 'Time commitment is required.' }),
	motivation: z.string().nonempty({ message: 'Motivation is required.' }),
});

export function ProfileForm() {
	const [loading, setLoading] = useState(false);

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			countryRegion: '',
			languagesSpoken: '',
			skills: '',
			experience: '',
			preferredContributionAreas: [],
			socialMediaLinks: '',
			timeCommitment: '',
			motivation: '',
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			setLoading(true);
			console.log(values);
			emailjs.init({
				publicKey: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY,
				limitRate: {
					id: 'vercel',
					throttle: 5000,
				},
			});

			await emailjs.send('service_h6lo7jb', 'template_voccwdi', values);
			alert('Form submitted successfully!');
		} catch (err) {
			console.error(err);
			alert('There was an error submitting the form.');
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-[#FDFDFD] px-4 py-12">
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
					PraSaga is looking for passionate ambassadors to join our mission! Please fill out this form if you
					are interested in becoming an ambassador.
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
								<FormMessage className="text-destructive" />
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
								<FormMessage className="text-destructive" />
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
								<FormMessage className="text-destructive" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="countryRegion"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-[#A646A1]">Country/Region</FormLabel>
								<FormControl>
									<Input placeholder="e.g. United States" className="text-black" {...field} />
								</FormControl>
								<FormMessage className="text-destructive" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="languagesSpoken"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-[#A646A1]">Languages Spoken</FormLabel>
								<FormControl>
									<Input
										placeholder="e.g. English, Spanish, Chinese"
										className="text-black"
										{...field}
									/>
								</FormControl>
								<FormMessage className="text-destructive" />
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
										placeholder="E.g. social media, content writing, translation, event hosting, graphic design"
										className="w-full rounded-md border px-3 py-2 text-black bg-white min-h-[100px]"
										{...field}
									/>
								</FormControl>
								<FormMessage className="text-destructive" />
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
										placeholder="Tell us about any relevant experience, projects, or communities you've helped grow."
										className="w-full rounded-md border px-3 py-2 text-black bg-white min-h-[100px]"
										{...field}
									/>
								</FormControl>
								<FormMessage className="text-destructive" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="preferredContributionAreas"
						render={() => (
							<FormItem>
								<div className="mb-2">
									<FormLabel className="text-base text-[#A646A1]">
										Preferred Contribution Areas
									</FormLabel>
									<p className="text-sm text-muted-foreground text-black">Select all that apply.</p>
								</div>
								<div className="space-y-2">
									{[
										'Community Building',
										'Content Creation',
										'Event Hosting',
										'Translations',
										'Social Media Promotion',
										'Educating New Users',
										'Technical Evangelism',
									].map((item) => (
										<FormField
											key={item}
											control={form.control}
											name="preferredContributionAreas"
											render={({ field }) => {
												return (
													<FormItem
														key={item}
														className="flex flex-row items-center space-x-3 space-y-0"
													>
														<FormControl>
															<Checkbox
																className="text-black border-black data-[state=checked]:bg-[#A646A1] data-[state=checked]:text-white data-[state=checked]:border-[#A646A1]"
																checked={field.value?.includes(item)}
																onCheckedChange={(checked) => {
																	return checked
																		? field.onChange([...(field.value || []), item])
																		: field.onChange(
																				(field.value || []).filter(
																					(value) => value !== item
																				)
																		  );
																}}
															/>
														</FormControl>
														<FormLabel className="font-normal text-black cursor-pointer">
															{item}
														</FormLabel>
													</FormItem>
												);
											}}
										/>
									))}
								</div>
								<FormMessage className="text-black mt-2" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="socialMediaLinks"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-[#A646A1]">Social Media Links</FormLabel>
								<FormControl>
									<textarea
										placeholder="Please share your Twitter, LinkedIn, Telegram, or Discord handles."
										className="w-full rounded-md border px-3 py-2 text-black bg-white min-h-[80px]"
										{...field}
									/>
								</FormControl>
								<FormMessage className="text-destructive" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="timeCommitment"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-[#A646A1]">Time Commitment</FormLabel>
								<FormControl>
									<select
										{...field}
										className="w-full rounded-md border px-3 py-2 text-black bg-white h-10"
									>
										<option value="" disabled>
											How many hours per week can you commit?
										</option>
										<option value="1-2 hours">1-2 hours</option>
										<option value="3-5 hours">3-5 hours</option>
										<option value="6-10 hours">6-10 hours</option>
										<option value="10+ hours">10+ hours</option>
									</select>
								</FormControl>
								<FormMessage className="text-destructive" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="motivation"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-[#A646A1]">
									Why do you want to join the PraSaga Ambassadors?
								</FormLabel>
								<FormControl>
									<textarea
										placeholder="A short paragraph about your motivation or alignment with our mission"
										className="w-full rounded-md border px-3 py-2 text-black bg-white min-h-[100px]"
										{...field}
									/>
								</FormControl>
								<FormMessage className="text-destructive" />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="w-full bg-[#A646A1] text-white hover:bg-purple-700"
						disabled={loading}
					>
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
}
