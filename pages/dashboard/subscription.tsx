import React from 'react'
// layouts
import Layout from '../../layouts';
import Page from '../../components/Page';
import useAuth from '../../hooks/useAuth';
import Card from './card';

subscription.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>;
};
export default function subscription() {
    return (
        <Page title="General: Banking">
            <Card />
        </Page>
    )
}
