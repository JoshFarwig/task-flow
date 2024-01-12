const OrgLayout = ({ 
    children
} : { 
    children: React.ReactNode; 
}) => { 
    return( 
        <div className="pt-20 md:pt-24">  
            {children}
        </div>
    )
}

export default OrgLayout; 