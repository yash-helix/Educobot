// @mui
import { styled } from '@mui/material/styles';
// layouts
import Layout from '../layouts';
// components
import Page from '../components/Page';
// sections
import {
    HomeHero,
    HomeMinimal,
    HomeDarkMode,
    HomeLookingFor,
    HomeColorPresets,
    HomePricingPlans,
    HomeAdvertisement,
    HomeCleanInterfaces,
    HomeHugePackElements,
} from '../sections/home';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
    height: '100%',
}));

const ContentStyle = styled('div')(({ theme }) => ({
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

HomePage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout variant="main">{page}</Layout>;
};

//-----------------------------------------------------------------------
const CARDS_INFO = {
    title: "PYTHON",
    sub_title: "Python - Today’s Language",
    CARDS: [
        {
            icon: './imgs/home/HomeImage.png',
            title: 'Why Python?',
            description:
                'Alexa, Siri, Google Maps and many more everyday technologies all rely on AI and ML, which are based on Python. The future is being built around these technologies, hence Python is the future. Moreover, it is the easiest coding language to learn.',
        },
        {
            icon: './imgs/home/HomeImage.png',
            title: 'Python in Everyday Life',
            description: 'Python code is applied to various aspects of today’s day-to-day life. A basic knowledge of the language is an invaluable skill, and helps to understand the evolving world around us.',
        },
        {
            icon: './imgs/home/HomeImage.png',
            title: 'Boost Your Skill Set',
            description: 'Most modern organisations and businesses rely on Python at some level or another. Adding knowledge of Python to your skill set opens the doors to various lucrative careers.',
        },
    ]
};

const CARDS_INFO1 = {
    title: "Coding",
    sub_title: "Coding - An Important 21st Century Skill",
    CARDS: [
        {
            icon: './imgs/home/HomeImage.png',
            title: 'Significance of Coding',
            description:
                'All modern technologies around us rely on some form of programmed code. From million-dollar businesses to the apps on your phone, coding is essential to their existence.',
        },
        {
            icon: './imgs/home/HomeImage.png',
            title: 'Why Learn Coding?',
            description: 'Just as one doesn’t learn to cook with the intention of becoming a professional chef, learning coding isn’t just for individuals on a career path to becoming app developers. Knowing the fundamentals of coding helps one better understand how modern technologies work.',
        },
        {
            icon: './imgs/home/HomeImage.png',
            title: 'Learn to Code - Start Now!',
            description: 'Coding can help you bring your imagination to life, and kids as young as six years old can be introduced to the basics. Start early and have the world at your fingertips!',
        },
    ]
};

const CARDS_INFO2 = {
    title: "DATA SCIENCE",
    sub_title: "Discover the True Power of Data!",
    CARDS: [
        {
            icon: './imgs/home/HomeImage.png',
            title: 'What is Data Science?',
            description:
                'Data science is the field of managing and understanding data, and applying it to make sound decisions in various domains.',
        },
        {
            icon: './imgs/home/HomeImage.png',
            title: 'Why Learn Data Science?',
            description: 'In today’s digital world, having a sound knowledge of data science is an added advantage for jobs across any field, from accounting to engineering and beyond.',
        },
        {
            icon: './imgs/home/HomeImage.png',
            title: 'Understanding Data',
            description: 'You don’t need to be a scientist to understand data science! In today’s data-intensive world, learning the basics of data science is as essential as knowing how to count.',
        },
    ]
};
// ----------------------------------------------------------------------

export default function HomePage() {
    return (
        <Page title="The starting point for your next project">
            <RootStyle>
                <HomeHero />
                <ContentStyle>
                    <HomeMinimal CARDS_INFO={CARDS_INFO} />

                    <HomeMinimal CARDS_INFO={CARDS_INFO1} />

                    <HomeMinimal CARDS_INFO={CARDS_INFO2} />

                    {/* <HomeHugePackElements />

                    <HomeDarkMode />

                    <HomeColorPresets />

                    <HomeCleanInterfaces />

                    <HomePricingPlans /> */}

                    <HomeLookingFor />

                    {/* <HomeAdvertisement /> */}
                </ContentStyle>
            </RootStyle>
        </Page>
    );
}
