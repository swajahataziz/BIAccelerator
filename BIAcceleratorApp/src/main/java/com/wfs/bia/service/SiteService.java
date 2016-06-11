package com.wfs.bia.service;

import com.wfs.bia.model.SubSite;
import com.wfs.bia.model.SubSitePart;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by wajahat on 06/03/2016.
 */
@Service
public interface SiteService {

    public List<String> getSubSites();

    public List<String> getSubsites(String subSiteName);

    public void createSubSiteTemplate(String templateName, String templateDescription, List<SubSitePart> templateParts);

    public void createSubSite(String subsiteName, String subSiteDescription, SubSite subSiteTemplate);
}
