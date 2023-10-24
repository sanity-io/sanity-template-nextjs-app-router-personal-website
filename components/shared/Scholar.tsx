import { data } from "cheerio/lib/api/attributes";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { user } from "scholarly";
import axios from "axios";

type Profile = {
    title: string;
    url?: string;
    authors: string[];
    numCitations?: number;
    year: number;
  };


const ScholarProfiles = () => {
    const searchString = "03ZHgEgAAAAJ"; // what we want to search
    const [profiles, setProfiles] = useState<Profile[]>([]);

    useEffect(() => {
        // async function fetchData() {
        //   const data = await user(searchString);
        //   const allProfiles = data.map((profile) => ({
        //     title: profile.title,
        //     url: profile.url,
        //     authors: profile.authors,
        //     numCitations: profile.numCitations,
        //     year: profile.year,
        //   }));
        //   setProfiles(allProfiles);
        // }
        async function fetchData() {
            const cachedData = localStorage.getItem(searchString);
            if (cachedData) {
              setProfiles(JSON.parse(cachedData));
            } else {
              const response = await fetch(`https://gooel-scholar.onrender.com/scholar/${searchString}`);
              const data = await response.json();
              setProfiles(data);
              localStorage.setItem(searchString, JSON.stringify(data));
            }            
        }
        //https://gooel-scholar.onrender.com/scholar/03ZHgEgAAAAJ
        fetchData();
      }, [searchString]);

    
      const columns = [
        {
          title: "Title",
          dataIndex: "title",
          key: "title",
          width: "40%",
        },
        {
          title: "Authors",
          dataIndex: "authors",
          key: "authors",
          render: (authors: string[]) => authors.join(", "),
          width: "20%",
        },
        {
          title: "Year",
          dataIndex: "year",
          key: "year",
          width: "10%",
        },
        {
          title: "Citations",
          dataIndex: "numCitations",
          key: "numCitations",
          width: "10%",
        },
        {
          title: "Journal",
          dataIndex: "journal",
          key: "journal",
          width: "20%",
        },
      ];
    
      return (
        <Table
          dataSource={profiles}
          columns={columns}
          pagination={false}
          bordered
          size="middle"
          // style={{ backgroundColor: "#f5f5f5" }}
        />
      );
};

export default ScholarProfiles;