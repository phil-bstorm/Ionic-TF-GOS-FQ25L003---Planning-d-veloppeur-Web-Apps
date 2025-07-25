import { inject, Injectable, signal } from "@angular/core";
import { Article } from "../models/article";
import { HttpClient } from "@angular/common/http";
import { forkJoin, Observable, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ArticleService {
    private readonly baseUrl = 'http://192.168.137.1:3000/article/';
    private readonly httpClient = inject(HttpClient);

    items = signal<Article[]>([]);

    constructor() {
        this.loadItems();
    }

    loadItems() {
        this.httpClient.get<Article[]>(this.baseUrl).subscribe(data => {
            this.items.set(data);
        })
    }

    addItem(name: string): Observable<Article> {
        return this.httpClient.post<Article>(this.baseUrl, {
            name,
            checked: false
            // continuer à travailler avec un observable
            // tap => réalise une opération à la fin de la requète
        }).pipe(tap(_ => this.loadItems()))
    }

    removeItem(item: Article) {
        return this.httpClient.delete(this.baseUrl + item.id)
            .pipe(tap(_ => this.loadItems()));
    }

    updateItem(item: Article) {
        return this.httpClient.put(this.baseUrl + item.id, item)
            .pipe(tap(_ => this.loadItems()));
    }

    removeAll() {
        const requests = this.items()
            .map(item => this.httpClient.delete(this.baseUrl + item.id));
        return forkJoin(requests)
            .pipe(tap(_ => this.loadItems()));
    }
}