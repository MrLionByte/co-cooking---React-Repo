import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input"; 
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Link, Clipboard } from "lucide-react";


interface URLExtractionCardProps {
    title: string;
    subtitle: string;
    inputPlaceholder: string;
    buttonLabel: string;
    onSubmit: (data: { url: string }) => void;
    isLoading: boolean;
}

const URLExtractionCard: React.FC<URLExtractionCardProps> = ({
    title,
    subtitle,
    inputPlaceholder,
    buttonLabel,
    onSubmit,
    isLoading,
}) => {
    const [url, setUrl] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (url.trim()) {
            onSubmit({ url: url.trim() });
        } else {
            toast.error("Please enter a valid URL.");
        }
    };

    return (
        <div className="mx-auto max-w-4xl pt-16 pb-24 px-4 sm:px-6 lg:px-8 text-white">
            <Card className="w-full max-w-lg mx-auto bg-gray-900 shadow-2xl rounded-xl border border-gray-700">
                <CardHeader className="text-center pt-6">
                    <div className="bg-lime-900/30 p-3 rounded-full mx-auto mb-2">
                        <Link className="text-lime-400" size={28} />
                    </div>
                    <CardTitle className="text-2xl font-bold text-white">
                        {title}
                    </CardTitle>
                    <p className="text-sm text-gray-400">
                        {subtitle}
                    </p>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4 px-6 pb-4">
                        <div className="flex items-center gap-2">
                            <Input
                                type="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder={inputPlaceholder}
                                required
                                className="grow text-base p-2.5 bg-gray-800 border-gray-700 text-white rounded-lg focus:ring-lime-400"
                            />
                            <Button 
                                type="button"
                                variant="outline" 
                                className="shrink-0 bg-gray-700 hover:bg-gray-600 text-gray-300 border-gray-600"
                                onClick={async () => {
                                    try {
                                        const text = await navigator.clipboard.readText();
                                        setUrl(text);
                                        toast.success("URL pasted from clipboard.");
                                    } catch (err) {
                                        toast.error("Clipboard access denied. Please paste manually.");
                                    }
                                }}
                            >
                                <Clipboard size={16} />
                            </Button>
                        </div>
                    </CardContent>

                    <CardFooter className="px-6 pb-6">
                        <Button
                            type="submit"
                            className="w-full bg-emerald-500 cursor-pointer hover:bg-lime-400 text-gray-900 font-semibold"
                            disabled={isLoading}
                        >
                            {isLoading ? "Extracting..." : buttonLabel}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default URLExtractionCard;